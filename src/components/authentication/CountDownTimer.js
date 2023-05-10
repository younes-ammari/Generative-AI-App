import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import Colors from '../../constants/theme/Colors';
import AppContext from '../../hooks/useContext';
import Layout from '../../constants/theme/Layout';

type Props = {
  /**
   * returns true when countdown is completed
   */
  setFinished?: ((finished:boolean) => void) | undefined,


  /**
   * countdown time in seconds
   */
  secs: number
};

export default function CountDownTimer({ secs = 60, setFinished }:Props) {
  const [timerCount, setTimer] = React.useState(secs)


  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        if (lastTimerCount < 1) {
          return 0
          //your redirection to Quit screen
        } else {
          console.log('finished component', lastTimerCount);
          setFinished(false)
          lastTimerCount == 1 && setFinished(true)
          lastTimerCount <= 1 && clearInterval(interval)
          return lastTimerCount - 1
        }
      })



      //each count lasts for a second
    }, 1000)
    //cleanup the interval on complete

    return () => clearInterval(interval)

  }, []);


  const {
    displayMode,
  } = React.useContext(AppContext)

  const deviceMode = useColorScheme()


  const mode = displayMode == "auto" ? deviceMode : displayMode

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: mode == "dark" ? Colors.lighter : Colors.red }]}>{timerCount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: Layout.font.h2,
    fontWeight: "500",

  }
})