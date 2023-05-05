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
    
    const deviceMode = useColorScheme()
    
    
    

    
    const [visibleLogout, setVisibleLogout] = React.useState(false)

    const [displayMode, setMode] = useState("light");

    const [appData, setAppData] = useState({
        mode:displayMode,
        user:{
            displayName:'',
        }
    });
    const [connectionState, setConnectionState] = useState({isConnected:false});

    const [demo, setDemo] = useState(1)

    const setAppDataHandler=(
        data=appData, 
        m=displayMode
    )=>{
        let past = data
        past.mode = m
        // console.log('m', m)
        setAppData(past)
        setMode(m)
        storage.save({
            key: 'appData', // Note: Do not use underscore("_") in key!
            data: past,
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
        .then(ret => {
            // found data goes to then()
            console.log("(UserContext) => appData", ret, ret.mode);
            ret.mode && setAppDataHandler(ret)
            ret.mode && setMode(ret.mode)
            
          })
          .catch(err => {
            setAppDataHandler({})
            setMode("auto")
            

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
    
    const loadAsyncData=async()=>{
        storage
        .load({
            key: 'appData'
        })
        .then(ret => {
            // found data goes to then()
            console.log("(UserContext) => appData", ret, ret.mode);
            ret.mode && setAppDataHandler(ret, ret.mode)
            
          })
          .catch(err => {
            setAppDataHandler({}, "auto")
            // setMode("auto")
            

            switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
            }
        });
    };

    useEffect(()=>{  
        // loadAsyncData()

    },[]);


    const data = {
        setMode,
        setAppData,
        displayMode, 
        appData,
        demo,
        setDemo,
        setAppDataHandler,
        loadAppDataHandler,
        visibleLogout, setVisibleLogout,
        styleColors:Colors[displayMode=="auto" ? deviceMode : displayMode]
    }
    

    return (
        <AppContext.Provider value={data}>
            {props.children}
        </AppContext.Provider>
        )   
};

export default AppContext;