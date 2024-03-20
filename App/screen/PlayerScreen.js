import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text, View} from 'react-native';
import FileViewer from "react-native-file-viewer";
import {useIsFocused} from "@react-navigation/native";
import AudioPlayerScreen1 from "./AudioPlayerScreen1";

const PlayerScreen = props => {
    const isFocused = useIsFocused();

    const [link, setLink] = useState('')
    useEffect(() => {
        if (isFocused && !props.route.params?.item?.book?.type.includes('audio')) {
            setLink(props.route.params?.docpath)
        }
    }, [isFocused]);

    useEffect(() => {
        if (link !== '') {
            FileViewer.open(link)
            setLink('')
        }
    }, [link, isFocused]);

    return (
        <View style={styles.container}>
            {
                props.route.params?.filepath && props.route.params?.item?.book?.type.includes('audio') ?
                    <AudioPlayerScreen1
                        title={props.route.params.title}
                        filepath={props.route.params.filepath}
                        dirpath={props.route.params.dirpath}
                        item={props.route.params.item
                        }

                    /> :
                    <Text style={{alignSelf:'center', marginTop:200}} >
                        Player Screen
                    </Text>}
        </View>
    );
};

export default PlayerScreen

const styles = StyleSheet.create({
    container: {flex: 1},
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    activityIndicator: {
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        opacity: 0.2
    }
})
