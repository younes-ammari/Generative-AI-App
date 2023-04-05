import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );
    function onKeyboardDidShow(e: KeyboardEvent) { // Remove type here if not using TypeScript
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {
    isVisible:isKeyboardVisible,
    height:keyboardHeight};
};