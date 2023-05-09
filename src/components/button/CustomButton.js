import { Text, TouchableOpacity, Dimensions, ViewStyle, useColorScheme } from 'react-native';
import React from 'react';
import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';
import { ActivityIndicator } from 'react-native';

type Props = {
  /**
   * Handler to be called when the user taps the button
   */
  onPress: (() => void) | undefined,

  /**
   * If true, disable all interactions for this component.
   */
  disabled: boolean,

  style: ViewStyle,

  /**
   * Text to display inside the button
   */
  label: string,

  /**
   * Text color
   */
  labelColor: string,

  /**
   * Button background color
   */
  color: string,
  outlined: boolean,

  /**
   * No Fill
   */
  noFill: boolean,


  /**
   * is loading 
   */
  isLoading: boolean
};


export default function CustomButton({
  color,
  label,
  onPress,
  outlined,
  style,
  labelColor,
  disabled,
  noFill,
  isLoading
}: Props) {

  const {
    displayMode,

  } = React.useContext(AppContext)


  const deviceMode = useColorScheme()
  const mode = displayMode == "auto" ? deviceMode : displayMode

  const windowDimension = { height: Dimensions.get("window").height, width: Dimensions.get("window").width }


  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={.5}
      onPress={onPress}
      style={[{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: outlined | noFill ? undefined : color ? color : Colors.primary,
        paddingVertical: outlined ? 15 : 18,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 15,
        alignSelf: "center",
        width: windowDimension.width * .85,
        borderWidth: noFill ? 0 : 1.5,
        borderColor: mode == "dark" ? Colors.lighter : color ? color : Colors.primary
      }, style && style]}
    >
      {
        isLoading
        &&
        <ActivityIndicator
          color={Colors.lighter}
        />
      }
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 18,
          marginStart:isLoading ? 9 : 0,
          color: labelColor ? labelColor : outlined ? mode == "dark" ? Colors.lighter : color ? color : Colors.primary : '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
