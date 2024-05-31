import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyInput, { MyInputProps } from "./MyInput";

const PasswordInput: React.FC<MyInputProps> = ({style, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <MyInput
        {...props}
        style={[styles.input, style]}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.passwordVisibilityButton}
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 8,
  },
  passwordVisibilityButton: {
    position: "absolute",
    right: 10,
  },
});

export default PasswordInput;
