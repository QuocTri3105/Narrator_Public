import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import {useDispatch, useSelector} from "react-redux";
import {deleteCollection} from "../redux/bookSlice";
import TempAvatar from "../components/TempAvatar";

const ShelfScreen = props => {
    const collections = useSelector((state) => state.books.collection)
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books.books)
    console.log('books', books)
    const OnDeleteCollection = (id) => {
        dispatch((deleteCollection({id})))
    }

    const OnAddCollection = () => {
        props.navigation.navigate('AddCollectionScreen')
    }

    const OnEditCollection = (item) => {
        props.navigation.navigate('EditCollectionScreen', {
            name: item.collectionName,
            data: item.listCollection,
            id: item.id
        })
    }

    const OnDetailCollection = (item) => {
        props.navigation.navigate('DetailCollectionScreen', {
            name: item.collectionName,
            data: item.listCollection,
            id: item.id
        })
    }

    const RenderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => OnDetailCollection(item)} style={{
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
                <TempAvatar fontSize={20} data={item.collectionName} style={{borderRadius: 70}} />
                <Text style={{
                    color: 'black', fontSize: 16, fontWeight: 'bold', width: '50%'
                }}>{item.collectionName}</Text>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', width: '20%'
                }}>
                    <TouchableOpacity onPress={() => OnEditCollection(item)}>
                        <Feather
                            color={'#124076'}
                            name={'edit'}
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => OnDeleteCollection(item.id)}>
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
            data={collections}
            renderItem={RenderItem}
            keyExtractor={(item, index) => `${index}${Math.random(10000)}`}
            contentContainerStyle={{
                marginHorizontal: 16
            }}
        />
        <TouchableOpacity onPress={OnAddCollection} style={{
            borderRadius: 20, backgroundColor: '#124076',
            width: 60, height: 60,
            justifyContent: 'center', alignItems: 'center',
            position: 'absolute', bottom: 20, right: 20
        }}>
            <Feather name={'plus'} color={'white'} size={24}/>
        </TouchableOpacity>
    </SafeAreaView>);
};

export default ShelfScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
