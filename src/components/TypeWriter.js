import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Message from './Message';

const TypeWriter = ({text, delay, isWriting, scrollRef }) => {
  const [typedText, setTypedText] = useState('');
  

  
  useEffect(() => {
    let index = 0;
    scrollRef && scrollRef.current.scrollToEnd();
    const scrollTimer = setInterval(() => {
        // scrollRef && scrollRef.current.scrollWithoutAnimationTo((x=0, y=-10))
    }, 90);
    const timer = setInterval(() => {
        setTypedText(text.substring(0, index));
        index++;
        // scrollRef && scrollRef.current.scrollToEnd()
      if (isWriting){
          isWriting(true)
        }
      if (index > text.length) {
        clearInterval(timer)
        if (isWriting){
          isWriting(false)
        }
      };
    }, delay);
    return () => {
        
        // clearInterval(scrollTimer);
        clearInterval(timer);
    }
  }, [text, delay]);

  


  return (
    <>
    <Message respond text={typedText} />
    <View style={{
        height:18, 
        // backgroundColor:'red',
        }}/>
    </>
  );
};

export default TypeWriter
