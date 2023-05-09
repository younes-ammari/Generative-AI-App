import React, { useRef, useState, useEffect } from "react";
import {
  OTPInputContainer,
  SplitOTPBoxesContainer,
  TextInputHidden,
  SplitBoxes,
  SplitBoxText,
  SplitBoxesFocused,
} from "./styles";




type Props = {
  /**
   * OTP code value
   */
  code: string,
  
  /**
   * set the maximumLength of the OTP code 
   * @default 6
   */
  maximumLength?: number,

  /**
   * Callback that is called when the maximumLength exceded
   */
  setIsPinReady?: ((ready: boolean) => void) | undefined;

  /**
   * Callback that is called when the otp code input's text changes.
   * code text is passed as an argument to the callback handler.*
   */
  setCode?: ((code: string) => void) | undefined;

};


const OTPInput = ({ code, maximumLength=6, setCode, setIsPinReady }:Props) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  const boxDigit = (_, index) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;
    return (
      <StyledSplitBoxes key={index}>
        <SplitBoxText>{digit}</SplitBoxText>
      </StyledSplitBoxes>
    );
  };

  return (
    <OTPInputContainer>
      <SplitOTPBoxesContainer onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </SplitOTPBoxesContainer>
      <TextInputHidden
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        keyboardType={"numeric"}
        onBlur={handleOnBlur}
      />
    </OTPInputContainer>
  );
};

export default OTPInput;