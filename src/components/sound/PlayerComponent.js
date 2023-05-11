import React from 'react'
import { View, Text, TouchableOpacity, Platform, Alert, ViewStyle, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';
import formatBytes from '../../functions/formatBytes';
import { StyleSheet } from 'react-native';


type Details = {
    name: string;
    size: number;
};

type Props = {
    url: string;
    details: Details;
    style: ViewStyle;
};

/**
 * @component
 * @name PlayerComponent
 * @description A player component for playing audio.
 * @param {Object} props - The component props.
 * @param {string} props.url - The URL of the audio file to be played.
 * @param {Object} props.details - Additional details about the audio file.
 * @param {string} props.details.name - The name of the audio file.
 * @param {number} props.details.size - The size of the audio file in bytes.
 */


export default class PlayerComponent extends React.Component<Props>{


    static contextType = AppContext

    constructor(props: Props) {
        super(props)
        this.url = props.url
        this.details = props.details
        this.style = props.style
        this.state = {
            playState: 'paused', //playing, paused
            playSeconds: 0,
            duration: 0
        }
        this.sliderEditing = false;
    }

    componentDidMount() {
        this.play();

        this.timeout = setInterval(() => {
            if (this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({ playSeconds: seconds });
                })
            }
        }, 100);
    }
    componentWillUnmount() {
        if (this.sound) {
            this.sound.release();
            this.sound = null;
        }
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }
    onSliderEditing = value => {
        if (this.sound) {
            this.sound.setCurrentTime(value);
            this.setState({ playSeconds: value });
        }
    }

    play = async () => {
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({ playState: 'playing' });
        } else {
            console.log('[Play]', this.url);

            this.sound = new Sound(this.url, null, (error) => {
                try {

                    if (error) {
                        console.log('failed to load the sound', error);
                        Alert.alert('Notice', 'audio file error. (Error code : 1)');
                        this.setState({ playState: 'paused' });
                    } else {
                        this.setState({ playState: 'paused', duration: this.sound.getDuration() });
                    }
                }
                catch {

                }
            });
        }
    }
    playComplete = (success) => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({ playState: 'paused', playSeconds: 0 });
            this.sound.setCurrentTime(0);
        }
    }

    pause = () => {
        if (this.sound) {
            this.sound.pause();
        }

        this.setState({ playState: 'paused' });
    }

    jumpPrev5Seconds = () => { this.jumpSeconds(-5); }
    jumpNext5Seconds = () => { this.jumpSeconds(5); }
    jumpPrev15Seconds = () => { this.jumpSeconds(-15); }
    jumpNext15Seconds = () => { this.jumpSeconds(15); }
    jumpSeconds = (secsDelta) => {
        if (this.sound) {
            this.sound.getCurrentTime((secs, isPlaying) => {
                let nextSecs = secs + secsDelta;
                if (nextSecs < 0) nextSecs = 0;
                else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
                this.sound.setCurrentTime(nextSecs);
                this.setState({ playSeconds: nextSecs });
            })
        }
    }

    getAudioTimeString(seconds) {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    }

    render() {


        const { styleColors } = this.context


        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);

        return (
            <View>
                <View style={[styles.container, this.style && this.style]}>
                    {this.details &&
                        <Text style={{ color: this.style.color ? this.style.color : Colors.lighter, alignSelf: 'center', fontSize: 15, marginTop: 6 }}>{String(this.details.name)}</Text>
                    }

                    <View style={styles.sliderContainer}>
                        <Text style={{ color: this.style.color ? this.style.color : Colors.lighter, alignSelf: 'center', fontSize: 13 }}>{currentTimeString}</Text>
                        <Slider
                            onTouchStart={this.onSliderEditStart}
                            onTouchEnd={this.onSliderEditEnd}
                            onValueChange={this.onSliderEditing}
                            value={this.state.playSeconds}
                            maximumValue={this.state.duration}
                            maximumTrackTintColor='gray'
                            minimumTrackTintColor={this.style.color ? this.style.color : Colors.lighter}
                            thumbTintColor={this.style.color ? this.style.color : Colors.lighter}
                            style={styles.slider} />

                        <Text style={{ color: this.style.color ? this.style.color : Colors.lighter, alignSelf: 'center', fontSize: 13 }}>{durationString}</Text>

                    </View>

                    <View style={styles.actionsContainer}>
                        <TouchableOpacity disabled={this.state.duration ? false : true} onPress={this.jumpPrev5Seconds} >
                            <MaterialCommunityIcons name='rewind-5' color={this.style.color ? this.style.color : Colors.lighter} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity disabled={this.state.duration ? false : true} onPress={this.state.duration && this.state.playState == 'paused' ? this.play : this.pause} style={{
                            marginHorizontal: 20,
                            width: 39, alignItems: "center", height: 39, justifyContent: "center"
                        }}>
                            {
                                this.state.duration
                                    ?
                                    this.state.playState == 'paused' ?
                                        <MaterialCommunityIcons name='play' color={this.style.color ? this.style.color : Colors.lighter} size={44} />
                                        :
                                        <MaterialCommunityIcons name='pause' color={this.style.color ? this.style.color : Colors.lighter} size={44} />



                                    :
                                    <ActivityIndicator size={25} color={this.style.color ? this.style.color : Colors.lighter} />
                            }
                        </TouchableOpacity>

                        <TouchableOpacity disabled={this.state.duration ? false : true} onPress={this.jumpNext5Seconds} >
                            <MaterialCommunityIcons name='fast-forward-5' color={this.style.color ? this.style.color : Colors.lighter} size={25} />

                        </TouchableOpacity>
                    </View>

                </View>
                {this.details.size &&
                    <Text style={{ color: styleColors.color, alignSelf: 'center', fontSize: 15, marginTop: 11 }}>
                        size :{String(formatBytes(this.details.size))}
                    </Text>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginVertical: 10
    },
    sliderContainer: {
        marginVertical: 15,
        marginHorizontal: 15,
        flexDirection: 'row'
    },
    slider: {
        flex: 1,
        alignSelf: 'center',
        marginHorizontal: Platform.select({ ios: 5 })
    },
    container: {
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 12,
        padding: 5,
    },
})