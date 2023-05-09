import { ImageSourcePropType, Image, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../constants/theme/Colors'
import { Pressable } from 'react-native'
import AppContext from '../../hooks/useContext'
import Images from '../../assets/Index'

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
     * Soon state 
     */
    soon?:boolean,
    
    /**
     * The image source (either a remote URL or a local file resource).
     *
     * This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments.
     * The native side will then choose the best uri to display based on the measured size of the image container.
     * A cache property can be added to control how networked request interacts with the local cache.
     *
     * The currently supported formats are png, jpg, jpeg, bmp, gif, webp (Android only), psd (iOS only).
     */
    imageSource?:ImageSourcePropType,

    /**
     * Called when a single tap gesture is detected.
     */
    onPress?: () => void | undefined,
  
  
  };

export default function CardImage({
    title,
    subtitle,
    soon=false,
    color=Colors.lighter,
    backgroundColor=Colors.primary,
    imageSource=Images.chatGPT,
    ...props
}:Props) {

    const deviceMode = useColorScheme()

    const {styleColors, displayMode} = useContext(AppContext)


    const mode = displayMode=="auto" ? deviceMode : displayMode



    

    
  return (
    <Pressable 
    
    style={[
        styles.container,
        {
            backgroundColor:styleColors.placeholder,
            
            borderWidth:1.4,
            borderColor:styleColors.placeholderTextColor

        },
      ]}
      android_ripple={{ color: mode=="dark"  ? 'rgba(100, 100, 100, .21)' : 'rgba(20, 20, 20, .1)' }}
      {...props}
    
      >
        {soon && 
            <View 
            style={{
                position:"absolute",
                width:"100%",
                height:"100%",
                zIndex:11,
                alignItems:"center",
                justifyContent:"center",
                alignSelf:"center",
                backgroundColor:'rgba(20, 20, 20, .6)',
            }}
            >
                <Text style={styles.title}>Soon</Text>
            </View>
            }
        <View style={styles.innerConatiner}>

            

            <View style={{
                height:255,
                width:255,
                borderRadius:111,
                backgroundColor:Colors.lighter,
                opacity:.1,
                position:'absolute',
                zIndex:-1,
                top:-22,
                right:-55,
                opacity:mode=="dark" ? .02 : .1
            }}/>
            <View style={{
                height:177,
                width:177,
                borderRadius:111,
                backgroundColor:Colors.lighter,
                opacity:.1,
                position:'absolute',
                zIndex:-1,
                top:-92,
                right:-2,
                opacity:mode=="dark" ? .02 : .1
            }}/>
            <View style={{
                flex:1,
                justifyContent:"space-around"
            }}>
                <Text style={[styles.title, {color:mode=="dark"  ? Colors.lighter : color}]}>{title}</Text>
                {subtitle&&<Text style={[styles.subtitle, {color:mode=="dark"  ? Colors.lighter : color}]}>{subtitle}</Text>}
                        
            </View>
            <View style={{
                alignItems:"center",
                justifyContent:"center",
                overflow:"hidden",
                borderRadius:15,
                borderWidth:1.7,
                
                borderColor:styleColors.placeholderTextColor,
                borderColor:'rgba(100, 100, 100, .4)',
            }}>
                <Image 
                source={imageSource}
                style={{
                    height:56,
                    width:56,
                    borderRadius:12,
                }}
                />

            </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    subtitle:{
        fontWeight:"300",
        fontSize:16,
        color:Colors.lighter,
        maxWidth:"95%",
        opacity:.5,
        
    },
    title:{
        fontWeight:"500",
        fontSize:18,
        letterSpacing:1,
        color:Colors.lighter

    },
    container:{
        minHeight:88,
        width:'100%',
        marginBottom:12,
        overflow:'hidden',
        borderRadius:12,
    },
    innerConatiner:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        paddingVertical:11,
        paddingHorizontal:12,
    }
})