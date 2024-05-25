import { useState } from "react";

const useMenuVisibility = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  return {
    menuVisible,
    setMenuVisible,
    toggleMenuVisibility,
    hideMenu,
  };
};

export default useMenuVisibility;
