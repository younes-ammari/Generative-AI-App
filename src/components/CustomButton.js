import {Text, View, TouchableOpacity, StyleProp ,ViewProps,ViewStyle,  useColorScheme} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import Colors from '../constants/Colors';
import AppContext from '../hooks/useContext';


export default function CustomButton({color, label, onPress, outline=false, style}) {
    
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
        backgroundColor: outline ? undefined : color ? color : Colors.primary,
        // padding: 20,
        paddingVertical:outline ? 15 : 18,
        // paddingHorizontal:outline ? 18 : 20,
        borderRadius: 10,
        marginBottom: 15,
        // elevation:11,
      }, outline && {borderWidth:1, borderColor: mode == "dark" ? Colors.lighter : color ? color : Colors.primary}, style&&style]}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 18,
          color: outline ?  mode == "dark" ? Colors.lighter : color ? color : Colors.primary :'#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  outline: PropTypes.bool,
  color: PropTypes.string
  // style: PropTypes.shape({
  //   ...TouchableOpacity.prototype.props.style, // add all the ViewStyle properties
  // })
}