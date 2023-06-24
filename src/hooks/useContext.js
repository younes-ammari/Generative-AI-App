import React, { createContext, useEffect, useState } from 'react';
import storage from './useStorage';
import { useColorScheme, TextStyle } from 'react-native';
import Colors from '../constants/theme/Colors'

const AppContext = createContext();

export const AppContextProvider = (props)=> {
    // Get Device Display Mode    
    const deviceMode = useColorScheme()
    
    const [visibleLogout, setVisibleLogout] = React.useState(false)
    const [storageLoading, setStorageLoading] = React.useState(true)

    const [displayMode, setMode] = useState("light");

    const [appData, setAppData] = useState({
        mode:displayMode,
        user:{
            displayName:'',
        }
    });
    
    const [demo, setDemo] = useState(1)

    const setAppDataHandler=({
        data=appData, 
        mode=displayMode
    })=>{
        let past = data
        past.mode = mode
        console.log('past.mode', past.mode)
        setAppData(past)
        setMode(past.mode)
        storage.save({
            key: 'appData', // Note: Do not use underscore("_") in key!
            data: past,
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            // expires: 1000 * 3600
            expires: null
        });
        // console.log('login token', json.token)
        
    };

    const loadAppDataHandler=async()=>{
        setStorageLoading(true)

        storage
        .load({
            key: 'appData'
        })
        .then(ret => {
            // found data goes to then()
            console.log("(UserContext) => appData", ret, ret.mode);
            setAppData(ret)
            if (ret.mode) { setMode(ret.mode) }
            setStorageLoading(false)
            
          })
          .catch(err => {
            setAppData({})
            setMode("auto")
            setStorageLoading(false)
            

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
    


    useEffect(()=>{  
        // loadAppDataHandler()

    },[]);
    

    const styleColors= Colors[displayMode == "auto" ? deviceMode : displayMode]

    const data = {
        setMode,
        setAppData,
        displayMode, 
        appData,
        demo,
        setStorageLoading,
        storageLoading,
        setDemo,
        setAppDataHandler,
        loadAppDataHandler,
        visibleLogout, setVisibleLogout,
        styleColors
    }
    

    return (
        <AppContext.Provider value={data}>
            {props.children}
        </AppContext.Provider>
        )   
};

export default AppContext;