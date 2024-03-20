import React, {useCallback, useState} from 'react';
import {Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useDispatch, useSelector} from "react-redux";
import {addBook, addCollection, editBook} from "../redux/bookSlice";
import uuid from "react-native-uuid";
import Feather from "react-native-vector-icons/Feather";
import TempAvatar from "../components/TempAvatar";

const AddCollectionScreen = props => {
    const books = useSelector((state) => state.books.books)

    const [collectionName, setCollectionName] = useState('')
    const [listSelected, setListSelected] = useState([])

    const dispatch = useDispatch()

    const handleAddCollection = () => {
        if (collectionName === '' || listSelected.length === 0) {
            Alert.alert('Vui lòng nhập đủ thông tin')
        } else {
            dispatch(addCollection({id: uuid.v1(), collectionName, listCollection: listSelected}))
            props.navigation.goBack()
        }
    }

    function toggleSelectedItem(item) {
        const isSelected = listSelected.filter((value) => value?.id === item.id)
        if (isSelected.length > 0) {
            const newSelectedItems = listSelected.filter((selectedItem) => selectedItem.id !== item.id);
            setListSelected(newSelectedItems);
        } else {
            setListSelected(prev => [...prev, item]);
        }
    }

    const RenderItem = ({item, index}) => {
        const isSelected = listSelected.filter((value) => value?.id === item.id)
        return (<TouchableOpacity
            onPress={() => {
                toggleSelectedItem(item)
            }}
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
                color: 'black', fontSize: 16, fontWeight: 'bold', width: '70%'
            }}>{item.bookName}</Text>
            {isSelected.length > 0 ? <View>
                <Feather name={'check'} color={'green'} size={20}/>
            </View> : <View style={{width: 20}}/>}
        </TouchableOpacity>)
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
            data={books}
            renderItem={RenderItem}
            keyExtractor={(item, index) => `${index}${Math.random(10000)}`}
        />
        <TouchableOpacity onPress={handleAddCollection} style={{
            backgroundColor: '#124076',
            paddingVertical: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'white', fontSize: 18, fontWeight: 'bold'
            }}>
                Tạo playlist
            </Text>
        </TouchableOpacity>
    </SafeAreaView>);
};

export default AddCollectionScreen

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
