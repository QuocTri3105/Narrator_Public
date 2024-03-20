import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useDispatch, useSelector} from "react-redux";
import {addBook, editBook, deleteBook, editCollection} from "../redux/bookSlice";
import uuid from "react-native-uuid";
import Feather from "react-native-vector-icons/Feather";
import TempAvatar from "../components/TempAvatar";

function isItemWithIdInArray(id, array) {
    return array.some((arrItem) => arrItem.id === id);
}

const DetailCollectionScreen = props => {
    const {id, name = '', data} = props.route.params
    const collection = useSelector((state) => state.books.collection)
    const books = useSelector((state) => state.books.books)
    const [listData, setListData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const filteredValue = collection.filter(item => item.id === id)
        let collections = filteredValue[0]
        const itemsNotInBooks = collections.listCollection.filter((item) => !isItemWithIdInArray(item.id, books));

        if (itemsNotInBooks.length > 0) {
            const updatedArr = collections.listCollection.filter((item) => item.id !== itemsNotInBooks[0].id);
            dispatch(editCollection({id, collectionName: name, listCollection: updatedArr}))
            collections.listCollection = updatedArr
            setListData(collections)
        } else
            setListData(collections)
    }, [collection]);

    useEffect(() => {

    }, [listData])

    const OnAddBookToCollection = () => {
        props.navigation.navigate('AddBookToCollectionScreen', {
            name, data: listData.listCollection, id
        })
    }
    const OnRemoveBook = (bookId) => {
        Alert.alert('Bạn có muốn xoá sách không?', 'Xác nhận', [{
            text: 'Không', style: 'cancel',
        }, {
            text: 'Có', onPress: () => dispatch(editCollection({
                id, collectionName: name, listCollection: listData.listCollection.filter(item => item.id !== bookId)
            })),
        },])
    }

    const OnReadBook = (item) => {
        props.navigation.navigate('Player', {
            title: item.bookName, filepath: item.book.uri, docpath: item.book.url, dirpath: null, item
        })
    }

    const RenderItem = ({item, index}) => {
        return (<TouchableOpacity onPress={() => OnReadBook(item)}
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
            {/*<View style={{*/}
            {/*    borderRadius: 70,*/}
            {/*    backgroundColor: 'red', width: 40, height: 40, justifyContent: 'center', alignItems: 'center'*/}
            {/*}}>*/}
            {/*    <Text style={{*/}
            {/*        color: 'white',*/}
            {/*        fontSize: 20,*/}
            {/*        fontWeight: 'bold',*/}
            {/*        textAlign: 'center',*/}
            {/*        textTransform: 'capitalize',*/}
            {/*    }}>{item.bookName[0]}</Text>*/}
            {/*</View>*/}
            <TempAvatar fontSize={20} data={item.bookName} style={{borderRadius: 70}} />
            <Text style={{
                color: 'black', fontSize: 16, fontWeight: 'bold', width: '70%'
            }}>{item?.bookName}</Text>
            <TouchableOpacity onPress={() => OnRemoveBook(item?.id)}>
                <Feather
                    color={'red'}
                    name={'trash'}
                    size={20}
                />
            </TouchableOpacity>
        </TouchableOpacity>)
    }

    return (<SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
        <View>
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }} style={styles.backBtn}>
                <Feather name={'arrow-left'} color={'black'} size={25}/>
            </TouchableOpacity>
        </View>
        <FlatList
            data={listData.listCollection}
            renderItem={RenderItem}
            keyExtractor={(item, index) => `${index}${Math.random(10000)}`}
        />
        <TouchableOpacity onPress={OnAddBookToCollection} style={{
            backgroundColor: '#124076',
            paddingVertical: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'white', fontSize: 18, fontWeight: 'bold'
            }}>
                Thêm sách vào playlist
            </Text>
        </TouchableOpacity>
    </SafeAreaView>);
};

export default DetailCollectionScreen

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
