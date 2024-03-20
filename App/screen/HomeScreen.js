import React, {useEffect} from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    PermissionsAndroid
} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import {useSelector, useDispatch} from "react-redux";
import {deleteBook} from "../redux/bookSlice";
import TempAvatar from "../components/TempAvatar";

const HomeScreen = props => {
    const books = useSelector((state) => state.books.books)
    const dispatch = useDispatch()

    const requestToPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Music',
                    message:
                        'App needs access to your Files... ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('startDownload...');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        requestToPermissions()
    }, []);

    const onAddBook = () => {
        props.navigation.navigate('AddBookScreen')
    }

    const onEditBook = (item) => {
        props.navigation.navigate('EditBookScreen', {
            name: item.bookName,
            desc: item.bookDesc,
            topicValue: item.topic,
            bookContent: item.book,
            id: item.id
        })
    }

    const OnRemoveBook = (id) => {
        Alert.alert('Bạn có muốn xoá sách không?', 'Xác nhận', [
            {
                text: 'Không',
                style: 'cancel',
            },
            {
                text: 'Có',
                onPress: () => dispatch(deleteBook({id})),
            },
        ])
    }

    const OnReadBook = (item) => {

        props.navigation.navigate('Player', {
            title: item.bookName,
            filepath: item.book.uri,
            docpath: item.book.url,
            dirpath: null,
            item
        })


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
                    color: 'black', fontSize: 16, fontWeight: 'bold', width: '50%'
                }}>{item.bookName}</Text>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', width: '20%'
                }}>
                    <TouchableOpacity onPress={() => {
                        onEditBook(item)
                    }}>
                        <Feather
                            color={'#124076'}
                            name={'edit'}
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => OnRemoveBook(item.id)}>
                        <Feather
                            color={'red'}
                            name={'trash'}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>)
    }

    return (<SafeAreaView style={styles.container}>
        <FlatList
            data={books}
            renderItem={RenderItem}
            keyExtractor={(item, index) => `${index}${Math.random(10000)}`}
            contentContainerStyle={{
                marginHorizontal: 16
            }}
        />
        <TouchableOpacity
            onPress={onAddBook}
            style={{
                borderRadius: 20, backgroundColor: '#124076',
                width: 60, height: 60,
                justifyContent: 'center', alignItems: 'center',
                position: 'absolute', bottom: 20, right: 20
            }}>
            <Feather name={'plus'} color={'white'} size={24}/>
        </TouchableOpacity>
    </SafeAreaView>);
};

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
