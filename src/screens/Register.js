import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Pressable,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import RegisterImage from '../images/register.png';
import GoogleImage from '../images/google.png';
import FacebookImage from '../images/facebook.png';

import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';
import ScreenWrapper from '../ScreenWrapper';
import AppContext from '../hooks/useContext';
import ReactNativeModal from 'react-native-modal';



export default function Register({navigation}){
    
    const {
        displayMode, 
        setMode,
        styleColors,
        setAppData,
        appData,
    } = useContext(AppContext)

    const deviceMode = useColorScheme()


    const mode = displayMode=="auto" ? deviceMode : displayMode

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [visibleRegistration, setVisibleRegistration] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');

  
  const [inputs, setInputs] = useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const [errors, setErrors] = useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const RegistrationModal=()=>{

    const styles = StyleSheet.create({
      title:{
        fontSize:21, 
        fontWeight:"400",
        textAlign:"center",
      },
      loadingContainer:{
        paddingVertical:22,
      }
    })

    return(
      <ReactNativeModal
      hasBackdrop
      hideModalContentWhileAnimating
      backdropColor={"rgba(10, 10, 10, .6)"}
      // animationOut={"zoomOut"}
      animationOut={"pulse"}
      animationIn={"pulse"}
      animationOutTiming={10}
        // animationIn={"pulse"}
        isVisible={visibleRegistration}
        onDismiss={()=>setVisibleRegistration(false)}
      >
        <View style={{ 
          backgroundColor:styleColors.placeholder,
          padding:22,
          // paddingVertical:18,
          paddingBottom:15,
          borderRadius:9
        }}>
          <Text style={[styles.title, {color:styleColors.color, fontSize:15,}]}>
            Registration in progress ...
          </Text>
          <Text style={[styles.title, {color:styleColors.color, fontSize:15,}]}>
            waite a while
          </Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={33} color={styleColors.color}/>
          </View>

        </View>
      </ReactNativeModal>
    )
  }



  const handleChecking=()=>{
    

    if (inputs.fullName.length<4) return setErrors({...errors, fullName:"Enter a valid full name"})
    
    if (inputs.email.match(/\S+@\S+\.\S+/)){
      if(inputs.password.length>7){
        if(inputs.confirmPassword.length>7){
          if(inputs.confirmPassword===inputs.password){
            //make Request
            
            setVisibleRegistration(true)
            console.log('register successfully')
            setTimeout(() => {
              setVisibleRegistration(false)
            }, 1000);
            // return true
          } else{
            setErrors({...errors, confirmPassword:"not matched passwords"})
          }

        } else{
          setErrors({...errors, confirmPassword:"enter a valid confirm password, must be at least 8 characters"})
        }
      } else{
        setErrors({...errors, password:"enter a valid password, must be at least 8 characters"})
      }
    } else{
      setErrors({...errors, email:"enter a valid email"})
    }
    // console.log(errors)



    
  }

  const handleRegister=()=>{
  
    setAppData({mode:displayMode,
      user:{
          name:'Mabrouk',
          coins:135
      }})
    handleChecking()
    setVisibleRegistration(true)
    setTimeout(() => {
      setErrors({
        fullName:"",
        email:"",
        password:"",
        confirmPassword:""
      })
    }, 4000);
    
    setTimeout(() => {
      setVisibleRegistration(false)  
      
      navigation.navigate("TabNav")
      setTimeout(() => {
        
          navigation.navigate('Home')
      }, 20);
    }, 1000);
    
  
  }

  return (
    <ScreenWrapper>
      {RegistrationModal()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 25, paddingBottom:15,}}
        >
        <View style={{alignItems: 'center'}}>
        <Image  
            source={RegisterImage}
            style={{
            height:222,
            width:222,
            marginTop:11,
            }}
            resizeMethod="scale"
            resizeMode="contain"
            />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: styleColors.color,
            opacity:.8,
            marginBottom: 30,
          }}>
          Register
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: styleColors.placeholderTextColor,
              borderWidth: 2,
              borderRadius: 10,
              flex:1,
              alignItems:"center",
              justifyContent:"center",
              marginHorizontal:3,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
                <Image  
               source={GoogleImage}
               style={{
                height:22,
                width:22
               }}
               resizeMethod="scale"
               resizeMode="contain"
              />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: styleColors.placeholderTextColor,
              borderWidth: 2,
              borderRadius: 10,
              flex:1,
              alignItems:"center",
              justifyContent:"center",
              marginHorizontal:3,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image  
             source={FacebookImage}
             style={{
              height:22,
              width:22
             }}
             resizeMethod="scale"
             resizeMode="contain"
            />
          </TouchableOpacity>
          
        </View>

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, register with email ...
        </Text>

        <InputField
          label={'Full Name'}
          error={errors.fullName}
          onChangeText={(text)=>setInputs({...inputs, fullName:text})}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color={styleColors.placeholderTextColor}
              style={{marginRight: 5}}
            />
          }
        />

        <InputField
          label={'Email ID'}
          error={errors.email}
          onChangeText={(text)=>setInputs({...inputs, email:text})}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={styleColors.placeholderTextColor}
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          error={errors.password}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color={styleColors.placeholderTextColor}
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          onChangeText={text=>setInputs({...inputs, password:text})}
        />
        
        <InputField
          label={'Confirm Password'}
          error={errors.confirmPassword}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color={styleColors.placeholderTextColor}
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          onChangeText={text=>setInputs({...inputs, confirmPassword:text})}
          // fieldButtonLabel={"Forgot?"}
          fieldButtonIcon={
            inputs.confirmPassword.length>7
            ?
            inputs.confirmPassword==inputs.password
            ?
            <Ionicons name='ios-checkmark-done-sharp' size={22} color={Colors.green} />
            :
            <Octicons name='x' size={22} color={Colors.red} />
            :
            <></>
          }
          // fieldButtonFunction={() => {navigation.navigate('ForgotPassword')}}
        />

        {/* <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={styleColors.placeholderTextColor}
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: styleColors.placeholderTextColor, marginLeft: 5, marginTop: 5}}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}

        <CustomButton label={'Register'} onPress={handleRegister} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color:styleColors.color}}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: Colors.primary, fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </ScreenWrapper>
  );
};




const styles = StyleSheet.create({
  title:{
    fontSize:21, 
    fontWeight:"400",
    textAlign:"center",
  },
})