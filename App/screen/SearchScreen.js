import React, {useEffect, useState} from 'react';
import {FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import {useSelector} from "react-redux";
import {Dropdown} from "react-native-element-dropdown";
import TempAvatar from "../components/TempAvatar";

const data = [
    {label: 'Văn học', value: '1'},
    {label: 'Trinh thám', value: '2'},
    {label: 'Tiểu thuyết', value: '3'},
    {label: 'Lãng mạn', value: '4'},
    {label: 'Truyện tranh', value: '5'},
    {label: 'Khoa học', value: '6'},
];

const SearchScreen = props => {
    const books = useSelector((state) => state.books.books)
    const [searchContent, setSearchContent] = useState('')
    const [filteredBook, setFilteredBook] = useState(books)
    const [topic, setTopic] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    function filterBooksByRegex(input) {
        const regex = new RegExp(input, "i");

        const filteredBooks = filteredBook.filter((item) => {
            return regex.test(item.bookName);
        });
        setFilteredBook(filteredBooks)
    }

    useEffect(() => {
        setFilteredBook(books)
    }, [books]);

    useEffect(() => {
        if (searchContent.length > 0) {
            filterBooksByRegex(searchContent)
        } else {
            setFilteredBook(books)
        }
    }, [searchContent])

    useEffect(() => {
        if (topic) {
            console.log('topic', topic)
            setFilteredBook(books.filter((data) => data.topic.value === topic.value))

        }
    }, [topic])

    const OnReadBook = (item) => {

        props.navigation.navigate('Player', {
            title: item.bookName,
            filepath: item.book.uri,
            docpath: item.book.url,
            dirpath: null,
            item
        })


    }

    const ClearData = () => {
        setSearchContent('')
        setTopic(null)
    }

    const RenderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => OnReadBook(item)} style={{
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
            </TouchableOpacity>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1} style={{
                height: '100%'
            }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    margin: 16, marginBottom: 0
                }}>
                    <Text style={{color: 'black', fontSize: 20}}>
                        Tìm kiếm
                    </Text>
                    <TouchableOpacity onPress={ClearData} style={{padding: 10, right: -10}}>
                        <Text style={{color: 'red'}}> Xoá bộ lọc</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 50,
                    marginTop: 10, borderWidth: 1, borderColor: 'gray', margin: 16
                }}>
                    <TextInput value={searchContent} onChangeText={setSearchContent} style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        padding: 10,
                        flex: 1,
                        fontSize: 15,
                    }}/>
                    <TouchableOpacity style={{
                        backgroundColor: '#124076',
                        height: '100%',
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Feather size={20} color={'white'} name={'search'}/>
                    </TouchableOpacity>
                </View>
                <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: '#124076'}]}
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

                <FlatList
                    data={filteredBook}
                    renderItem={RenderItem}
                    keyExtractor={(item, index) => `${index}${Math.random(10000)}`}
                    contentContainerStyle={{
                        marginHorizontal: 16
                    }}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SearchScreen

const styles = StyleSheet.create({
    container: {},
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginTop: 5,
        marginHorizontal: 16, marginBottom: 16
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
    textStyle: {
        fontSize: 14,
        color: 'black'
    }
})
