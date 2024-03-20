import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, Platform, Alert, SafeAreaView} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import LottieView from "lottie-react-native";

const img_speaker = require('../asset/images/ui_speaker.png');
const img_pause = require('../asset/images/ui_pause.png');
const img_play = require('../asset/images/ui_play.png');
const img_playjumpleft = require('../asset/images/icons8-replay-10-90.png');
const img_playjumpright = require('../asset/images/icons8-forward-10-90.png');
const logo = require('../asset/images/logo1.jpeg');

const AudioPlayerScreen = (props) => {
    const [playState, setPlayState] = useState('paused');
    const [playSeconds, setPlaySeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sliderEditing, setSliderEditing] = useState(false);
    const [sound, setSound] = useState(null);
    const {
        filepath,
        item,
    } = props
    useEffect(() => {
        play();

        const timeout = setInterval(() => {
            if (sound && !sliderEditing) {
                sound.getCurrentTime((seconds, isPlaying) => {
                    setPlaySeconds(seconds);
                });
            }
        }, 100);

        return () => {
            if (sound) {
                sound.release()
                setSound(null);
            }
            clearInterval(timeout);
        };
    }, [sound]);

    const onSliderEditStart = () => {
        setSliderEditing(true);
    };

    const onSliderEditEnd = () => {
        setSliderEditing(false);
    };

    const onSliderEditing = (value) => {


        sound.setCurrentTime(value);
        setPlaySeconds(value);

    };

    const play = async () => {
        if (sound) {
            sound.play(playComplete);
            setPlayState('playing');
        } else {
            console.log('[Play]', filepath);

            const newSound = new Sound(filepath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error');
                    setPlayState('paused');
                } else {
                    setPlayState('playing');
                    setDuration(newSound.getDuration());
                    newSound.play(playComplete);
                    setSound(newSound);
                }
            });
        }
    };

    const playComplete = (success) => {
        if (sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error');
            }
            setPlayState('paused');
            setPlaySeconds(0);
            sound.setCurrentTime(0);
        }
    };

    const pause = () => {
        if (sound) {
            sound.pause();
        }
        setPlayState('paused');
    };

    const jumpPrev10Seconds = () => {
        jumpSeconds(-10);
    };

    const jumpNext10Seconds = () => {
        jumpSeconds(10);
    };

    const jumpSeconds = (secsDelta) => {
        if (sound) {
            sound.getCurrentTime((secs) => {
                let nextSecs = secs + secsDelta;
                if (nextSecs < 0) nextSecs = 0;
                else if (nextSecs > duration) nextSecs = duration;
                sound.setCurrentTime(nextSecs);
                setPlaySeconds(nextSecs);
            });
        }
    };

    const getAudioTimeString = (seconds) => {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt((seconds % (60 * 60)) / 60);
        const s = parseInt(seconds % 60);

        return (
            (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
        );
    };

    const currentTimeString = getAudioTimeString(playSeconds);
    const durationString = getAudioTimeString(duration);


    return (
        <View style={{flex: 1, backgroundColor: '#FFFFFF', height: '100%'}}>
            <View style={{justifyContent: 'center', flex: 1}}>
                <View style={{justifyContent: 'center'}}>
                    <LottieView
                        source={require("../asset/animation/VinylDisc.json")}
                        style={{width: 200, height: 200, alignSelf: 'center', marginBottom: 10}}
                        autoPlay
                        loop
                    />
                    <View style={{width: 80, height: 80, position:'absolute', alignSelf:'center',
                        borderRadius: 100}}>
                        <Image source={logo} style={{width: '100%', height: '100%',borderRadius:100}}/>
                    </View>
                </View>
                <View style={{alignSelf: 'center'}}>
                    <Text style={{color: '#000000', fontSize: 23, fontWeight: 'bold', textAlign: 'center'}}>
                        {item.bookName}
                    </Text>
                    <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                        {item.topic.label}
                    </Text>
                    <Text style={{color: '#000000', fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                        {item.bookDesc}
                    </Text>
                </View>
                <View style={{marginVertical: 15, marginHorizontal: 15, flexDirection: 'row'}}>
                    <Text style={{color: '#000000', alignSelf: 'center'}}>{currentTimeString}</Text>
                    <Slider
                        onTouchStart={onSliderEditStart}
                        onTouchEnd={onSliderEditEnd}
                        onValueChange={onSliderEditing}
                        value={playSeconds}
                        maximumValue={duration}
                        maximumTrackTintColor='gray'
                        minimumTrackTintColor='#124076'
                        thumbTintColor='#124076'
                        style={{flex: 1, alignSelf: 'center', marginHorizontal: Platform.select({ios: 5})}}
                    />
                    <Text style={{color: '#000000', alignSelf: 'center'}}>{durationString}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 15}}>
                    <TouchableOpacity onPress={jumpPrev10Seconds} style={{justifyContent: 'center'}}>
                        <Image source={img_playjumpleft} style={{width: 30, height: 30}}/>
                        <Text style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            marginTop: 1,
                            color: '#000000',
                            fontSize: 12
                        }}>15</Text>
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: '#124076',
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 30
                    }}>
                        {playState === 'playing' && (
                            <TouchableOpacity onPress={pause}>
                                <Image source={img_pause} style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                        )}
                        {playState === 'paused' && (
                            <TouchableOpacity onPress={play}>
                                <Image source={img_play} style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity onPress={jumpNext10Seconds} style={{justifyContent: 'center'}}>
                        <Image source={img_playjumpright} style={{width: 30, height: 30}}/>
                        <Text style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            marginTop: 1,
                            color: '#000000',
                            fontSize: 12
                        }}>15</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AudioPlayerScreen;
