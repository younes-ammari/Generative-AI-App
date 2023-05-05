import { Pressable, StyleSheet, Text, ScrollView, useColorScheme, View, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from '../ScreenWrapper'
import Colors from '../constants/Colors'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import AppContext from '../hooks/useContext'
import Step from '../components/Step'
import PaymentMethod from '../components/PaymentMethod'
import HistoryComponent from '../components/HistoryComponent'
import CustomButton from '../components/CustomButton'

export default function History({ navigation }) {

  const PointPrise = 0.2



  const deviceMode = useColorScheme()

  const { styleColors, displayMode, appData } = useContext(AppContext)

  const mode = displayMode == "auto" ? deviceMode : displayMode


  const [coins, setCoins] = useState(135)
  const Icon = <FontAwesome5 name='coins' size={20} color={styleColors.color} />


  const [tab, setTab] = useState("all")

  const tabs = [
    {
      title: "All",
      value: "all"
    },
    {
      title: "ChatGPT",
      value: "chat"
    },
    {
      title: "Voice Gen",
      value: "voice"
    },
    {
      title: "Content Gen",
      value: "content"
    },
    {
      title: "Summarize",
      value: "video"
    },
  ]


  function TabElement({ title, value }) {
    const selected = value == tab
    return (
      <Pressable style={{
        paddingVertical: 1,
        paddingHorizontal: 11,
        marginTop: 11,
        marginBottom: 9,
        marginRight: 9,
        borderBottomWidth: selected ? 2 : 0,
        borderBottomColor: styleColors.color
      }} onPress={() => setTab(value)}>
        <Text style={[styles.title, { marginTop: 0, color: styleColors.color, fontSize: !selected ? 15 : 16, fontWeight: !selected ? "100" : null }]}>{title}</Text>
      </Pressable>
    )
  };

  function typeNavigationHandler(type, data, date) {
    console.log(type, data)
    switch (type) {
      case "chat":
        return navigation.navigate("Chat", { data: data, date: date })
      case "voice":
        return navigation.navigate("Voice", { data: data, date: date })
      case "image":
        return navigation.navigate("ImageGen", { data: data, date: date })
      case "video":
        return navigation.navigate("Video", { data: data, date: date })
      case "content":
        return navigation.navigate("Content", { data: data, date: date })
    }
  }


  const data = [
    {
      type: "chat",
      title: "show image matplotlib python",
      date: "11 jan",
      data: { messages: 12, details: "Here's a basic example of how to show an image using matplotlib in Python:" },
    },
    {
      type: "image",
      title: "a robot game for kids with white screen background",
      date: "9 jan",
      data: [
        "https://m.media-amazon.com/images/I/61tTCj3LOdL._SL1200_.jpg",
        "https://i.ebayimg.com/images/g/2-YAAOSwH3haEf3C/s-l500.jpg",
        "https://i.ebayimg.com/images/g/5W8AAOSwSN5dxQJX/s-l1600.jpg"
      ]
    },
    {
      type: "voice",
      title: "Maintaining Good Health",
      date: "10 jan",
      data: {date: "10 jan", waves: [], output_format: "mp3", duration: "1 min", content: "Maintaining good health is an essential aspect of living a happy and fulfilling life. Good health not only ensures physical well-being but also promotes mental and emotional wellness. Leading a healthy lifestyle involves taking care of the body through regular exercise, a nutritious diet, and proper rest. It also includes taking care of the mind by managing stress levels and engaging in activities that promote mental clarity and relaxation." }
    },
    {
      type: "voice",
      title: "the Modern World",
      date: "9 jan",
      data: { waves: [], output_format: "wave", duration: "26 sec", content: "The modern world is characterized by significant technological advancements, cultural diversity, and globalization. With the rise of the internet and social media, communication and access to information have become more accessible than ever before. This has led to a more interconnected world, where people can easily connect and interact with others from different parts of the globe. " }
    },
    {
      type: "video",
      title: "The Importance of Programming in the Modern World",
      date: "4 jan",
      data: {summarize: "Programming has become an essential skill in the modern world due to the widespread use of technology in almost every aspect of our lives. From smartphones to cars, from healthcare to finance, and from education to entertainment.",
    text:"Programming has become an essential skill in the modern world due to the widespread use of technology in almost every aspect of our lives. From smartphones to cars, from healthcare to finance, and from education to entertainment, programming plays a critical role in shaping our society. The ability to code empowers individuals to create software, applications, and websites that can automate tasks, solve problems, and improve efficiency. This results in new opportunities for innovation, business growth, and personal development.", 
    url:"https://youtube.com/watch=QoldLgzglk"  
  }
    },
    {
      type: "content",
      title: "Facebook Blog post about Health",
      date: "1 jan",
      data: { type: "Blog", prompt:"prompt Health is a fundamental aspect", drafts: 2, content: [
        "Health is a fundamental aspect of our lives that often gets overlooked or neglected due to our busy schedules and responsibilities. However, prioritizing our health should be a top priority in our daily lives. It is essential to understand that taking care of our health not only benefits us physically but also mentally and emotionally.",
        "Health is a fundamental aspect of our lives that often gets overlooked or neglected due to our busy schedules and responsibilities. However, prioritizing our health should be a top priority in our daily lives. It is essential to understand that taking care of our health not only benefits us physically but also mentally and emotionally.",
      ] }
    },
  ]
  return (
    <ScreenWrapper scroll back fill title="Last Activities">

      <View style={styles.viewContainer}>

        <ScrollView horizontal contentContainerStyle={{ alignItems: "center" }}>
          {
            tabs.map((el, i) =>
              <TabElement key={i} title={el.title} value={el.value} />
            )
          }


        </ScrollView>

        {
          tab == "all"
            ?
            data.map((el, i) =>
              <HistoryComponent
                key={i}
                onPress={()=>typeNavigationHandler(el.type, el.data, el.date)}
                type={el.type}
                title={el.title}
                data={el.data}
                date={el.date}
              />)
            :
            data.filter(el => el.type == tab).map((el, i) =>
              <HistoryComponent
                key={i}
                onPress={()=>typeNavigationHandler(el.type, el.data, el.date)}
                type={el.type}
                title={el.title}
                data={el.data}
                date={el.date}
              />)
        }

      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 15,
    // position:"absolute",
    // bottom:0,
    top: 55,
  },
  viewContainer: {
    paddingHorizontal: 15,
  },
  coinsText: {
    fontSize: 15,
    // letterSpacing:.523,
    opacity: .8,
    // paddingBottom:5,
    // margin:0,
    color: Colors.yellow,
    fontWeight: "400",
  },
  coinsNumber: {
    fontSize: 33,
    marginHorizontal: 7,
    // letterSpacing:.523,
    // marginBottom:10,
    color: Colors.lighter,
    fontWeight: "500",
  },
  coinsContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "rgba(180, 181, 255, 0.13)",
    paddingHorizontal: 22,
    paddingVertical: 13,
    marginTop: 11,
    width: "60%",
    borderRadius: 9,
  },
  upperTitle: {
    fontSize: 19,
    // letterSpacing:.523,
    margin: 11,
    marginBottom: 10,
    // paddingBottom:5,
    // margin:0,
    color: Colors.lighter,
    fontWeight: "500",
  },
  upperContainer: {
    // justifyContent:"center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 22,
    paddingBottom: 30,
    paddingTop: 44,
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
  },
  title: {
    fontSize: 21,
    marginTop: 18,
    marginBottom: 9,
    fontWeight: "500",
  },
  moreTitle: {
    fontSize: 14,
    marginTop: 18,
    marginBottom: 9,
    color: Colors.red,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  flex: { flexDirection: 'row' },
  jCenter: { justifyContent: "center" },
  aCenter: { alignItems: "center" },
})