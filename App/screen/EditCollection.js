import React, {useState} from 'react';
import {Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useDispatch, useSelector} from "react-redux";
import {addBook, editBook, editCollection} from "../redux/bookSlice";
import Feather from "react-native-vector-icons/Feather";
import TempAvatar from "../components/TempAvatar";

const EditCollectionScreen = props => {
    const {id, name = '', data} = props.route.params

    const [collectionName, setCollectionName] = useState(name)

    const dispatch = useDispatch()

    const handleEditCollection = () => {
        if (collectionName === '') {
            Alert.alert('Vui lòng nhập đủ thông tin')
        } else {
            dispatch(editCollection({id, collectionName, listCollection: data}))
            props.navigation.goBack()
        }
    }

    const RenderItem = ({item, index}) => {
        return (<View
            style={{
                paddingVertical: 10,
                width: '100%',
                backgroundColor: 'white',
                marginBottom: 10,
                paddingHorizontal: 15,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'grey'
            }}>
            <TempAvatar fontSize={20} data={item.bookName} style={{borderRadius: 70}} />
            <Text style={{
                color: 'black', fontSize: 16, fontWeight: 'bold', width: '85%'
            }}>{item.bookName}</Text>
        </View>)
    }

    return (<SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
        <View>
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }} style={styles.backBtn}>
                <Feather name={'arrow-left'} color={'black'} size={25}/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                <Text style={styles.title}>
                    Tên playlist:
                </Text>
                <TextInput style={styles.textInput} value={collectionName} onChangeText={setCollectionName}/>
            </TouchableOpacity>
        </View>
        <FlatList
            data={data}
            renderItem={RenderItem}
            keyExtractor={(item, index) => `${index}${Math.random(10000)}`}
        />
        <TouchableOpacity onPress={handleEditCollection} style={{
            backgroundColor: '#124076',
            paddingVertical: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'white', fontSize: 18, fontWeight: 'bold'
            }}>
                Cập nhật playlist
            </Text>
        </TouchableOpacity>
    </SafeAreaView>);
};

export default EditCollectionScreen

const styles = StyleSheet.create({
    container: {flex: 1, margin: 16, justifyContent: 'space-between'}, textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        padding: 10,
        color: 'black',
    }, dropdown: {
        height: 60, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 8, marginTop: 5,
    }, icon: {
        marginRight: 5,
    }, label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    }, placeholderStyle: {
        fontSize: 16, color: 'black'
    }, selectedTextStyle: {
        fontSize: 14, color: 'black'
    }, iconStyle: {
        width: 20, height: 20,
    }, inputSearchStyle: {
        height: 40, fontSize: 16,
    }, title: {
        color: 'black', fontSize: 16
    }, bookSelect: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        padding: 10,
        color: 'black',
        height: 70,
        justifyContent: 'center'
    }, bookTitle: {
        color: 'black', fontSize: 16, textAlign: 'center', textAlignVertical: 'center',
    }, backBtn: {
        marginBottom: 5, alignSelf: 'flex-start', padding: 10, left: -10
    }
})
