import { Image, StyleSheet, View } from "react-native";
import React from "react";

interface ImageLogoProps {
  width: number;
  height: number;
}
const ImageLogo: React.FC<ImageLogoProps> = ({ width, height }) => {
  const taskCraftImage = require("../../assets/Task Craft.png");
  const padding = 10; // Define el padding aquí

  const circleSize = width + padding * 2; // Calcula el tamaño del círculo con el padding

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: 0.5 * circleSize, // Utiliza el tamaño del círculo para el radio
          width: circleSize,
          height: circleSize,
          padding: padding,
        },
      ]}
    >
      <Image
        style={{
          width: width,
          height: height,
        }}
        source={taskCraftImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    overflow: "hidden", // Clip the image to the circle
  },
});

export default ImageLogo;
