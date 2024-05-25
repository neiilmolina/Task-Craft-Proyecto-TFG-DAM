import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle } from "react-native";

interface MyInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}

const MyInput: React.FC<MyInputProps> = ({ style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextInput
      {...props}
      style={[styles.input, style, isFocused && styles.inputFocused]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      textAlignVertical="top"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#91CEFA",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputFocused: {
    borderColor: "#1A659E",
  },
});

export default MyInput;
