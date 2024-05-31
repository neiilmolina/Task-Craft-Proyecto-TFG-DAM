import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface MyButtonProps extends TouchableOpacityProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const MyButton: React.FC<MyButtonProps> = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

export const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#91CEFA',
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "500",
  },
});
