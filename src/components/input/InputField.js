import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, useColorScheme, StyleSheet, KeyboardTypeOptions } from 'react-native';
import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';
import Ionicons from "react-native-vector-icons/Ionicons"


// Button Props
type Props = {
  /**
   * Text to display inside the input => placeholder
   */
  label: string,

  /**
   * set the value of the input component
   */
  value: string,

  /**
   * adding an icon button at the right of the component
   */
  icon: JSX.Element,

  /**
   * set if the input is a password 
   */

  inputType?: "password" | undefined,// "password" or not

  /**
   * show the error message of the input component
   */
  error: string,

  /**
   * enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad',
   * 'decimal-pad', 'twitter', 'web-search', 'visible-password')
   */
  keyboardType?: KeyboardTypeOptions | undefined,

  /**
   * adding button at the right of the component like 'forget password' button
   */
  fieldButtonLabel: string,

  /**
   * adding an icon button at the right of the component
   */
  fieldButtonIcon: JSX.Element,

  /**
   * triggered when the fieldButtonLabel is pressed 
   */
  fieldButtonFunction: () => void,

  /**
   * Callback that is called when the text input's text changes.
   * Changed text is passed as an argument to the callback handler.
   */
  onChangeText?: ((text: string) => void) | undefined;

  /**
   * If true, disable all interactions for this component.
   */
  disabled: boolean,

  /**
   * style<ViewStyle>
   */
  style: ViewStyle,
};




export default function InputField({
  label,
  icon,
  inputType,
  error,
  value,
  keyboardType,
  fieldButtonLabel,
  fieldButtonIcon,
  fieldButtonFunction,
  onChangeText,
  disabled = false,
  ...props
}: Props) {


  const {
    styleColors,
  } = useContext(AppContext)

  const [secure, setSecure] = React.useState(true)


  return (
    <View style={styles.container}>
      <View
        style={styles.innorContainer}>
        {icon}
        {inputType == 'password' ? (
          <TextInput
            value={value}
            placeholder={label}
            keyboardType={keyboardType}
            placeholderTextColor={styleColors.placeholderTextColor}
            style={{ flex: 1, paddingVertical: 0, color: styleColors.color }}
            secureTextEntry={secure}
            onChangeText={onChangeText}
            {...props}

          />
        ) : (
          <TextInput
            value={value}
            placeholder={label}
            keyboardType={keyboardType}
            placeholderTextColor={styleColors.placeholderTextColor}
            style={{ flex: 1, paddingVertical: 0, color: styleColors.color }}
            onChangeText={onChangeText}
            {...props}
          />
        )}
        {fieldButtonIcon}
        {inputType == 'password'
          &&
          <TouchableOpacity onPress={() => setSecure(!secure)} style={{ marginStart: 9, marginEnd: 9 }}>
            <Ionicons name={secure ? 'eye-outline' : 'eye-off-outline'} color={styleColors.color} size={22} />
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{ color: Colors.primary, fontWeight: '700' }}>{fieldButtonLabel}</Text>
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
  errorText: {
    color: Colors.red,
    fontSize: 12,
    fontWeight: "400"


  },
  container: {
    marginBottom: 25,

  },
  innorContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 7,
  }
})