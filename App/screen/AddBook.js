import React, {useCallback, useState} from 'react';
import {Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Dropdown} from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from "react-redux";
import {addBook} from "../redux/bookSlice";
import uuid from "react-native-uuid";
import Feather from "react-native-vector-icons/Feather";
import RNFS from 'react-native-fs'

const data = [
    {label: 'Văn học', value: '1'},
    {label: 'Trinh thám', value: '2'},
    {label: 'Tiểu thuyết', value: '3'},
    {label: 'Lãng mạn', value: '4'},
    {label: 'Truyện tranh', value: '5'},
    {label: 'Khoa học', value: '6'},
];

const AddBookScreen = props => {
    const [bookName, setBookName] = useState('')
    const [bookDesc, setBookDesc] = useState('')
    const [topic, setTopic] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [book, setBook] = useState({})

    const dispatch = useDispatch()

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                // presentationStyle: 'fullScreen',
                // allowMultiSelection: false,
            });
            if (response && response.length > 0) {
                if (response[0].uri.startsWith('content://')) {
                    const urlComponents = response[0].uri.split('/')
                    const fileNameAndExtension = urlComponents[urlComponents.length - 1]
                    const destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`
                    await RNFS.copyFile(response[0].uri, destPath)
                    response[0].url =  response[0].uri
                    response[0].uri = `file://${destPath}`

                }
                console.log('response[0].uri', response[0])
                setBook(response[0])

            } else {
                Alert.alert('Có lỗi khi chọn sách, xin vui lòng thử lại')
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleAddBook = () => {
        if (bookName === '' || bookDesc === '' || Object.keys(topic).length === 0 || Object.keys(book).length === 0) {
            Alert.alert('Vui lòng nhập đủ thông tin')
        } else {
            dispatch(addBook({id: uuid.v1(), book, bookName, bookDesc, topic, collectionId: []}))
            props.navigation.goBack()
        }
    }

    return (<SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
        <View>
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }} style={styles.backBtn}>
                <Feather name={'arrow-left'} color={'black'} size={25}/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                <Text style={styles.title}>File:</Text>
                <TouchableOpacity onPress={handleDocumentSelection} style={styles.bookSelect}>
                    <Text style={styles.bookTitle}>
                        {Object.keys(book).length > 0 ? book?.name : 'Chọn sách'}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                    Tên sách:
                </Text>
                <TextInput style={styles.textInput} value={bookName} onChangeText={setBookName}/>
                <Text style={styles.title}>
                    Mô tả:
                </Text>
                <TextInput multiline={true}
                           numberOfLines={4} style={styles.textInput} value={bookDesc}
                           onChangeText={setBookDesc} textAlignVertical={'top'}/>
                <Text style={styles.title}>Thể loại:</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: '#3d84b8'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={styles.textStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Chọn thể loại' : '...'}
                    value={topic?.value || ''}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setTopic(item);
                        setIsFocus(false);
                    }}
                />
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddBook} style={{
            backgroundColor: '#3d84b8',
            paddingVertical: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'
        }}>
            <Text style={{
                color: 'white',
                fontSize: 18, fontWeight: 'bold'
            }}>
                Thêm sách
            </Text>
        </TouchableOpacity>
    </SafeAreaView>);
};

export default AddBookScreen

const styles = StyleSheet.create({
    container: {flex: 1, margin: 16, justifyContent: 'space-between'},
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        padding: 10,
        color: 'black',
    },
    dropdown: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginTop: 5,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black'
    },
    selectedTextStyle: {
        fontSize: 14,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    title: {
        color: 'black', fontSize: 16
    },
    bookSelect: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        padding: 10,
        color: 'black', height: 70, justifyContent: 'center'
    },
    bookTitle: {
        color: 'black', fontSize: 16, textAlign: 'center', textAlignVertical: 'center',
    },
    backBtn: {
        marginBottom: 5, alignSelf: 'flex-start', padding: 10, left: -10
    },
    textStyle:{
        fontSize: 14,
        color: 'black'
    }
})
