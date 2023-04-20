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
import ScreenWrapper from '../ScreenWrapper';
import Colors from '../constants/Colors';
import AnimatedRing from '../components/RecordingEffect';

export default function VoiceScreen (){
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isRecording, setRecording] = useState(false);



  // console.log(Voice)

  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = e => {
    const text = e.value[0];
    setResult(text);
    console.log('result', text)
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
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

        {isRecording && <AnimatedRing />}

          <Text style={{
            color:Colors.darker,
          }}>{result ? result : "say something!"}</Text>
          {/* <TextInput
            value={result}
            multiline={true}
            placeholder="say something!"
            style={{
              flex: 1,
              height: '100%',
            }}
            onChangeText={text => setResult(text)}
          /> */}
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

