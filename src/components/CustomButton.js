import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import AppContext from '../hooks/useContext';

export default function CustomButton({label, onPress, outline=false}) {
    
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setAppDataHandler,
    
  } = React.useContext(AppContext)


  const deviceMode = useColorScheme()
  const mode = displayMode=="auto" ? deviceMode : displayMode


  return (
    <TouchableOpacity
      activeOpacity={.5}
      onPress={onPress}
      style={[{
        // height:55,
        alignItems:"center",
        justifyContent:"center",
        // backgroundColor: '#AD40AF',
        backgroundColor: outline ? undefined : Colors.primary,
        // padding: 20,
        paddingVertical:outline ? 15 : 18,
        // paddingHorizontal:outline ? 18 : 20,
        borderRadius: 10,
        marginBottom: 15,
        // elevation:11,
      }, outline && {borderWidth:1, borderColor: mode == "dark" ? Colors.lighter :Colors.primary}]}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 18,
          color: outline ?  mode == "dark" ? Colors.lighter :Colors.primary :'#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
