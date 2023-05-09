import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Message from './Message';



type Props = {
  /**
   * TypeWriter text
   */
  text?: string | "TypeWriter text",


  /**
   * Writing state 
   */
  isWriting?: boolean,

  /**
   * Loading state used for the typing ... effect
   */
  isLoading?: boolean,

  /**
   * Typing delay
   */
  delay?: number,


};




const TypeWriter = ({ text, delay, isWriting, scrollRef }: Props) => {
  const [typedText, setTypedText] = useState('');



  useEffect(() => {
    let index = 0;
    scrollRef && scrollRef.current.scrollToEnd();

    const timer = setInterval(() => {
      setTypedText(text.substring(0, index));
      index++;
      if (isWriting) {
        isWriting(true)
      }
      if (index > text.length) {
        clearInterval(timer)
        if (isWriting) {
          isWriting(false)
        }
      };
    }, delay);
    return () => {

      clearInterval(timer);
    }
  }, [text, delay]);




  return (
    <>
      <Message respond text={typedText} />
      <View style={{
        height: 18,
      }} />
    </>
  );
};

export default TypeWriter
