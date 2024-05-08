import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface MyButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ title, onPress, ...props }) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#91CEFA',
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});
