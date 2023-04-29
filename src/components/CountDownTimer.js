import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import AppContext from '../hooks/useContext';

export default function CountDownTimer({secs=60, setFinished}) {
    const [timerCount, setTimer] = React.useState(secs)
    // const [finished, setFinished] = React.useState(secs)


    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                if (lastTimerCount < 1) {
                    // console.log('finished', true)
                    // setFinished(true)
                    
                    return 0
                    //your redirection to Quit screen
                } else {
                    console.log('finished component', lastTimerCount);
                    setFinished(false)
                    lastTimerCount==1 && setFinished(true)
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                }
            })

                
        
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        
        return () => clearInterval(interval)
                        
    }, []);

    
  const {
    displayMode, 
    setMode,
    styleColors,
    appData,
    setAppData

    } = React.useContext(AppContext)

    const deviceMode = useColorScheme()


    const mode = displayMode=="auto" ? deviceMode : displayMode

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color:mode=="dark" ? Colors.lighter : Colors.red}]}>{timerCount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        
    },
    title:{
        fontSize:15,
        fontWeight:"500",
        
    }
})