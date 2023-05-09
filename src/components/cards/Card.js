import { Dimensions, StyleSheet, Text, View, useColorScheme, ColorValue } from 'react-native'
import React, { useContext } from 'react'
import { Pressable } from 'react-native'
import AppContext from '../../hooks/useContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../constants/theme/Colors'
import Layout from '../../constants/theme/Layout'


type Props = {
    /**
     * Card title
     */
    title?:string | "card title",
    
    /**
     * Card subtitle
     */
    subtitle?:string | "card subtitle",
    
    /**
     * Card color
     */
    color?: ColorValue | number | undefined;
    
    
    /**
     * Card backgroundColor
     */
    backgroundColor?: ColorValue | number | undefined;
    
    /**
     * Card flag
     */
    flag?:JSX.Element,
    
    /**
     * Called when a single tap gesture is detected.
     */
    onPress?: () => void | undefined,
  
  
  };

export default function Card({
    title,
    subtitle,
    color=Colors.lighter,
    backgroundColor=Colors.primary,
    icon=<MaterialCommunityIcons name='robot' color={Colors.light} size={55} />,
    flag,
    onPress,
    ...props
}:Props) {

    const deviceMode = useColorScheme()

    const {styleColors, displayMode} = useContext(AppContext)


    const mode = displayMode=="auto" ? deviceMode : displayMode



    

    
  return (
    <Pressable 
    
    style={({ pressed }) => [
        styles.container,
        {
            overflow:'hidden',
            borderWidth:1.4,
            borderRadius:12,
            borderColor:'rgba(100, 100, 100, .4)'

        },
      ]}
      android_ripple={{ color: mode=="dark"  ? 'rgba(100, 100, 100, .21)' : 'rgba(20, 20, 20, .1)' }}
      onPress={onPress}
      {...props}
    
      >

        
        <View style={{
            flex:1,
            justifyContent:"space-around"
        }}>
            <Text style={[styles.title, {color:mode=="dark"  ? Colors.lighter : color}]}>{title}</Text>
            {subtitle&&<Text style={[styles.subtitle, {color:mode=="dark"  ? Colors.lighter : color}]}>{subtitle}</Text>}
                    
        </View>
        <View style={{
            height:58,
            width:60,
            alignItems:"center",
            justifyContent:"center",
            overflow:"hidden",
            borderRadius:12
        }}>
            {icon}
            {flag && 
            <View style={{
                position:"absolute",
                right:1,
                top:2
            }}>
                {flag}
            </View>
            }
           
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    subtitle:{
        fontWeight:"300",
        fontSize:15,
        letterSpacing:.81,
        color:Colors.lighter,
        maxWidth:"85%",
        
    },
    title:{
        fontWeight:"500",
        fontSize:18,
        letterSpacing:1,
        color:Colors.lighter

    },
    container:{
        width:'40%',
        minHeight:88,
        borderRadius:Layout.radius.small,
        paddingHorizontal:Layout.padding.medium,
        paddingVertical:11,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        width:Dimensions.get('window').width*.95,
        alignSelf:"center",
        marginBottom:12,
    }
})