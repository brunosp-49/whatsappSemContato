import { useEffect, useState } from "react";
import { Dimensions, Keyboard } from "react-native";

export const useUnits = () =>{
    const { width, height } = Dimensions.get('window');
    const units = {
        vw: width / 100,
        vh: height / 100,
      };
    return units
}

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
              setKeyboardVisible(true);
          },
      );
      const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
              setKeyboardVisible(false);
          },
      );

      return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
      };
  }, []);

  return isKeyboardVisible;
};