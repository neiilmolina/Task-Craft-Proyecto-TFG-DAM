import { useState } from 'react';
import { Animated } from 'react-native';

const useMenuAnimation = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnim = useState(new Animated.Value(0))[0];

  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  return {
    menuAnim,
    toggleMenu,
    menuVisible,
  };
};

export default useMenuAnimation;
