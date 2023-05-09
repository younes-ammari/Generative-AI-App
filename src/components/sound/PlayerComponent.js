import React from 'react'
import { View, Image, Text, 
    // Slider, 
    TouchableOpacity, Platform, Alert, useColorScheme} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';
import formatBytes from '../../functions/formatBytes';


const img_speaker = require('../resources/ui_speaker.png');
const img_pause = require('../resources/ui_pause.png');
const img_play = require('../resources/ui_play.png');
const img_playjumpleft = require('../resources/ui_playjumpleft.png');
const img_playjumpright = require('../resources/ui_playjumpright.png');

export default class PlayerComponent extends React.Component{
    

    // static navigationOptions = props => ({
    //     title:"title",
    //     url:"https://peregrine-results.s3.amazonaws.com/pigeon/eJLhFdV2DdE0P5Q9vy_0.wav"
    // })
    static contextType = AppContext

    constructor(props){
        super(props);
        this.url = props.url
        this.details = props.details
        // this.url = "https://peregrine-results.s3.amazonaws.com/pigeon/eJLhFdV2DdE0P5Q9vy_0.wav"
        this.state = {
            playState:'paused', //playing, paused
            playSeconds:0,
            duration:0
        }
        this.sliderEditing = false;
    }

    componentDidMount(){
        this.play();
        
        this.timeout = setInterval(() => {
            if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds:seconds});
                })
            }
        }, 100);
    }
    componentWillUnmount(){
        if(this.sound){
            this.sound.release();
            this.sound = null;
        }
        if(this.timeout){
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
        if(this.sound){
            this.sound.setCurrentTime(value);
            this.setState({playSeconds:value});
        }
    }

    play = async () => {
        if(this.sound){
            this.sound.play(this.playComplete);
            this.setState({playState:'playing'});
        }else{
            // const filepath = "https://peregrine-results.s3.amazonaws.com/pigeon/eJLhFdV2DdE0P5Q9vy_0.wav";
            const filepath = "https://peregrine-results.s3.amazonaws.com/pigeon/eJLhFdV2DdE0P5Q9vy_0.wav";
            var dirpath = null;
            // if (this.props.navigation.state.params.dirpath) {
            //     dirpath = this.props.navigation.state.params.dirpath;
            // }
            console.log('[Play]', this.url);
    
            this.sound = new Sound(this.url, null, (error) => {
                try{

                    if (error) {
                        console.log('failed to load the sound', error);
                        Alert.alert('Notice', 'audio file error. (Error code : 1)');
                        this.setState({playState:'paused'});
                    }else{
                        this.setState({playState:'paused', duration:this.sound.getDuration()});
                        // this.setState({playState:'playing', duration:this.sound.getDuration()});
                        // this.sound.play(this.playComplete);
                    }
                }
                catch{

                }
            });    
        }
    }
    playComplete = (success) => {
        if(this.sound){
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({playState:'paused', playSeconds:0});
            this.sound.setCurrentTime(0);
        }
    }

    pause = () => {
        if(this.sound){
            this.sound.pause();
        }

        this.setState({playState:'paused'});
    }

    jumpPrev5Seconds = () => {this.jumpSeconds(-5);}
    jumpNext5Seconds = () => {this.jumpSeconds(5);}
    jumpPrev15Seconds = () => {this.jumpSeconds(-15);}
    jumpNext15Seconds = () => {this.jumpSeconds(15);}
    jumpSeconds = (secsDelta) => {
        if(this.sound){
            this.sound.getCurrentTime((secs, isPlaying) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
                this.sound.setCurrentTime(nextSecs);
                this.setState({playSeconds:nextSecs});
            })
        }
    }

    getAudioTimeString(seconds){
        const h = parseInt(seconds/(60*60));
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);

        return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }

    render(){
        
        
        const { displayMode, styleColors} = this.context

        // this.styleColors = styleColors

        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);

        return (
            <View>
            <View style={{
                // flex:1, 
                justifyContent:'center', 
                // backgroundColor:'black',
                backgroundColor:Colors.primary,
                borderRadius:12,
                // opacity:.9,
                padding:5,
                }}>
                    {this.details && 
                    <Text style={{color:'white', alignSelf:'center', fontSize:15, marginTop:6}}>{String(this.details.name)}</Text>
                    }
                {/* <Image source={img_speaker} style={{width:150, height:150, marginBottom:15, alignSelf:'center'}}/> */}

                <View style={{marginVertical:15, marginHorizontal:15, flexDirection:'row'}}>
                    <Text style={{color:'white', alignSelf:'center', fontSize:13}}>{currentTimeString}</Text>
                    <Slider
                        onTouchStart={this.onSliderEditStart}
                        // onTouchMove={() => console.log('onTouchMove')}
                        onTouchEnd={this.onSliderEditEnd}
                        // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                        // onTouchCancel={() => console.log('onTouchCancel')}
                        onValueChange={this.onSliderEditing}
                        value={this.state.playSeconds} 
                        maximumValue={this.state.duration} 
                        maximumTrackTintColor='gray' 
                        minimumTrackTintColor='white' 
                        thumbTintColor='white' 
                        style={{
                            flex:1, 
                            alignSelf:'center', 
                            marginHorizontal:Platform.select({ios:5})
                            }}/>
                    <Text style={{color:'white', alignSelf:'center', fontSize:13}}>{durationString}</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'center', alignItems:"center", marginVertical:10}}>
                    <TouchableOpacity onPress={this.jumpPrev5Seconds} >
                        <MaterialCommunityIcons name='rewind-5' color={Colors.lighter} size={25}/>
                    </TouchableOpacity>
                    {this.state.playState == 'playing' && 
                    <TouchableOpacity onPress={this.pause} style={{marginHorizontal:20}}>
                        <MaterialCommunityIcons name='pause' color={Colors.lighter} size={44}/>
                    </TouchableOpacity>}
                    {this.state.playState == 'paused' && 
                    <TouchableOpacity onPress={this.play} style={{marginHorizontal:20}}>
                        <MaterialCommunityIcons name='play' color={Colors.lighter} size={44}/>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={this.jumpNext5Seconds} >
                        <MaterialCommunityIcons name='fast-forward-5' color={Colors.lighter} size={25}/>
                        
                    </TouchableOpacity>
                </View>
                
            </View>
            {this.details && 
                    <Text style={{color:styleColors.color, alignSelf:'center', fontSize:15, marginTop:11}}>
                        size :{String(formatBytes(this.details.size))}
                        </Text>
                    }
            </View>
        )
    }
}