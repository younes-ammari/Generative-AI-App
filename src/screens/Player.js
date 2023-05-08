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
import Colors from '../constants/theme/Colors';
import AppContext from '../hooks/useContext';
import PlayerScreen from './PlayerScreen';

export default function Player ({route, navigation}){
    
  const {url, ...otherparams} = route.params
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isRecording, setRecording] = useState(false);


  return (
    <ScreenWrapper back title='Voice Player'>
    <View style={styles.container}>
        <PlayerScreen url="https://peregrine-results.s3.amazonaws.com/pigeon/eJLhFdV2DdE0P5Q9vy_0.wav"/>
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

