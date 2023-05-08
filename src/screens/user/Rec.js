import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-community/voice';
import ScreenWrapper from '../../ScreenWrapper';
import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";


export default function Rec (){
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isRecording, setRecording] = useState(false);




  // console.log(Voice)

  const speechStartHandler = e => {
    setRecording(true)
    
    console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = e => {
    const text = e.value[0];
    setResult(text);
    console.log('result', text)
  };

  const startRecording = async () => {
    // setLoading(true);
    setRecording(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
      setRecording(false);
    }
  };

  const stopRecording = async () => {
    // setRecording(false);
    try {
      await Voice.stop();
      setRecording(false);
    } catch (error) {
      setRecording(false);
      console.log('error', error);
    }
  };

  const clear = () => {
    setResult('');
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // console.info(Voice.)
  
  // console.log('speech recognition');


  return (
    <ScreenWrapper back title='Voice'>
    <View style={styles.container}>
        <Text style={styles.headingText}>Voice to Text Recognition</Text>
        <View style={styles.textInputStyle}>

        
{/* 
        {isRecording && (
          <>
          <Ring delay={0} />
          <Ring delay={10} />
          <Ring delay={100} />
          <Ring delay={1000} />
          </>
        )} */}
        {/* {isRecording && <AnimatedRing />} */}

          <Text style={{
            color:Colors.darker,
          }}>{result ? result : "say something!"}</Text>
          
        </View>

        <View style={styles.btnContainer}>
          {isLoading ? 
            <ActivityIndicator size="large" color="black" />
           : (
            <TouchableOpacity onPress={startRecording} style={styles.speak}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Speak</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.stop} onPress={stopRecording}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Stop</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.clear} onPress={clear}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Clear</Text>
        </TouchableOpacity>
    </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  recorderCircle: {
    width: 280,
    height: 280,
    borderRadius: 150,
    borderColor: "red",
    // borderColor: Colors.DUSTY_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  volumeMeterContainer: {
    width: 290,
    height: 290,
    borderRadius: 140.5,
    borderColor: "green",
    justifyContent: 'center',
    padding: 20,
  },

  audioRecorderTimer: {
    fontFamily: 'Quicksand',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 45,
    lineHeight: 56,
    textAlign: 'center',
    letterSpacing: -0.746023,
    color: "red",
    // color: Colors.DUSTY_ORANGE,
  },
  
  ring: {
    position: "absolute",
    left:"50%",
    right:"50%",
    top:"50%",
    bottom:"50%",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "tomato",
    borderWidth: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    // justifyContent:"space-between"
    justifyContent:"space-evenly",
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    // height: 100,
    marginBottom:58,
    borderRadius: 20,
    paddingVertical: 16,
    paddingVertical:53,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  speak: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  stop: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  clear: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    with: '50%',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
});

