import { Text, TouchableOpacity, Dimensions, ViewStyle, useColorScheme } from 'react-native';
import React from 'react';
import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';

// Button Props
type Props = {
  /**
   * Handler to be called when the user taps the button
   */
  onPress: () => void,

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
  labelColor:string,

  /**
   * Button background color
   */
  color: string,
  outlined: boolean,

  /**
   * No Fill
   */
  noFill:boolean
};


export default function CustomButton({
  color,
  label,
  onPress,
  outlined,
  style,
  labelColor,
  disabled,
  noFill
}: Props) {

  const {
    displayMode,
    setMode,
    styleColors,
    appData,
    setAppDataHandler,

  } = React.useContext(AppContext)


  const deviceMode = useColorScheme()
  const mode = displayMode == "auto" ? deviceMode : displayMode

  const windowDimension = {height:Dimensions.get("window").height, width:Dimensions.get("window").width}


  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={.5}
      onPress={onPress}
      style={[{
        // height:55,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: outlined | noFill ? undefined : color ? color : Colors.primary,
        paddingVertical: outlined ? 15 : 18,
        borderRadius: 10,
        marginBottom: 15,
        alignSelf:"center",
        width:windowDimension.width*.85,
        borderWidth: noFill ? 0 : 1.5,
        borderColor: mode == "dark" ? Colors.lighter : color ? color : Colors.primary 
        // elevation:11,
      }, style && style]}
    // {...props}
    >
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 18,
          color: labelColor ? labelColor : outlined ? mode == "dark" ? Colors.lighter : color ? color : Colors.primary : '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// export default CustomButton
// CustomButton.propTypes = {
//   label: PropTypes.string.isRequired,
//   onPress: PropTypes.func,
//   outlined: PropTypes.bool,
//   color: PropTypes.string
//   // style: PropTypes.shape({
//   //   ...TouchableOpacity.prototype.props.style, // add all the ViewStyle properties
//   // })
// }