import React, { createContext, useEffect, useState } from 'react';
// import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import storage from './useStorage';
import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors'

const AppContext = createContext();

export const AppContextProvider = (props)=> {
    const API_LINK = 'https://ywam1o.deta.dev/app/v1'
    // const route = useRoute();
    // const navigation = useNavigation();
    // setActiveScreen(route.name);

    
    // const [mode, setAppMode] = useState('auto')
    // var mode="auto"

    // const setMode=async(m)=>{
    //     // mode = m
    //     setAppMode(m)
    // }
    const [mode, setMode] = useState('light')

    const [appData, setAppData] = useState({
        mode:mode,
        user:{
            name:'',
        }
    });
    const [connectionState, setConnectionState] = useState({isConnected:false});

    const [demo, setDemo] = useState(1)

    const setAppDataHandler=(appData)=>{
        setAppData(appData)
        storage.save({
            key: 'appData', // Note: Do not use underscore("_") in key!
            data: appData,
            // data: {data:"demp"},
            // userData: json.data, // Note: Do not use underscore("_") in key!
        
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            // expires: 1000 * 3600
            expires: null
        });
        // console.log('login token', json.token)
        
    };

    const loadAppDataHandler=()=>{

        storage
        .load({
            key: 'appData'
        })
        .then(result => {
            // found data goes to then()
            console.log("(UserContext) => appData", result);
            setAppData(result)
            setMode(result.mode)
            
            
            
        })
        .catch(err => {
            setAppData({})
            // any exception including data not found
            // goes to catch()
            // console.warn("(UserContext) => ", err.message);
            switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
            }
        });
        
    }

    const logoutHandler = ()=>{
        console.log('logoutHandler event')
        storage.remove({
            key: 'appData'
        });
    }
    // console.log('context handler')
    
    // function checkInternetConnection() {
    //     NetInfo.addEventListener(state =>{
    //     //   if (state.isConnected==false || state.isInternetReachable==false){
    //     //     // setModalVisible(true);
    //         setConnectionState(state); 
    //         console.log("Connection types", state.type);
    //         // console.log("(Home) => Your device appears to have no internet connectivity. Please check your connection settings and try again");
    //     //   }
    //     //   else{
    //     //     setConnectionState(state);
    //     //   }
    //     })};
    // console.warn('outside useeffect')    
    useEffect(()=>{
        // setMode('auto')
        
        // console.log('inside useeffect',"UUID",  UUID ? true : false)    
        // checkInternetConnection()
        // loadAppDataHandler()
        
        
        // loadAsyncData()
       
        // dd()
        
    

    },[]);


    // if (appData.mode=='auto'){
    //     setMode(useColorScheme())
    // } else {
    //     setMode(appData.mode)
    // }

    const data = {
        setMode,
        mode, 
        appData,
        demo,
        setDemo,
        setAppDataHandler,
        loadAppDataHandler,
        styleColors:Colors[mode=="auto" ? useColorScheme() : mode]
    }
    

    return (
        <AppContext.Provider value={data}>
            {props.children}
        </AppContext.Provider>
        )   
};

export default AppContext;