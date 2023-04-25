import React, { useContext } from 'react';
import {View, Text, TouchableOpacity, TextInput, useColorScheme} from 'react-native';
import Colors from '../constants/Colors';
import AppContext from '../hooks/useContext';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {

  
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
} = useContext(AppContext)

const deviceMode = useColorScheme()


const mode = displayMode=="auto" ? deviceMode : displayMode

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          placeholderTextColor={styleColors.placeholderTextColor}
          style={{flex: 1, paddingVertical: 0, color:styleColors.color}}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          placeholderTextColor={styleColors.placeholderTextColor}
          style={{flex: 1, paddingVertical: 0, color:styleColors.color}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: Colors.primary, fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
