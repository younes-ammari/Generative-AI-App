import React, { useContext } from 'react';
import {View, Text, TouchableOpacity, TextInput, useColorScheme, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import AppContext from '../hooks/useContext';
import Ionicons from "react-native-vector-icons/Ionicons"

export default function InputField({
  label,
  icon,
  inputType,
  error,
  keyboardType,
  fieldButtonLabel,
  fieldButtonIcon,
  fieldButtonFunction,
  onChangeText,
  ...props
}) {

  
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
  } = useContext(AppContext)

  const deviceMode = useColorScheme()


  const mode = displayMode=="auto" ? deviceMode : displayMode;

  const [secure, setSecure]= React.useState(true)


  return (
    <View style={styles.container}>
      <View
        style={styles.innorContainer}>
        {icon}
        {inputType == 'password' ? (
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            placeholderTextColor={styleColors.placeholderTextColor}
            style={{flex: 1, paddingVertical: 0, color:styleColors.color}}
            secureTextEntry={secure}
            onChangeText={onChangeText}
            {...props}
            
          />
        ) : (
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            placeholderTextColor={styleColors.placeholderTextColor}
            style={{flex: 1, paddingVertical: 0, color:styleColors.color}}
            onChangeText={onChangeText}
            {...props}
          />
        )}
        {fieldButtonIcon}
        {inputType == 'password'
        &&
        <TouchableOpacity onPress={()=>setSecure(!secure)} style={{marginStart:9, marginEnd:9}}>
          <Ionicons name={secure ? 'eye-outline' : 'eye-off-outline'} color={styleColors.color} size={22}/>
        </TouchableOpacity>
        }
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{color: Colors.primary, fontWeight: '700'}}>{fieldButtonLabel}</Text>
        </TouchableOpacity>
      </View>

      {error
      &&
      <Text style={styles.errorText}>{error}</Text>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  errorText:{
    color:Colors.red,
    fontSize:12,
    fontWeight:"400"


  },
  container:{
    marginBottom: 25,

  },
  innorContainer:{
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    alignItems:"center",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 7,
  }
})