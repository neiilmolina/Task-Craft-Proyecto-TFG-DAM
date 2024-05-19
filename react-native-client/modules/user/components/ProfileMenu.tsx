import React from "react";
import { View, Button, StyleSheet } from "react-native";

export const ProfileMenu = ({
  onPickImageFromGallery,
  onTakePhotoWithCamera,
  onUploadImage,
  uploading,
  onPress,
}) => {
  return (
    <View style={styles.menuContainer}>
      <Button
        title="Pick an image from gallery"
        onPress={onPickImageFromGallery}
        disabled={uploading}
      />
      <Button
        title="Take a photo"
        onPress={onTakePhotoWithCamera}
        disabled={uploading}
      />
      <Button
        title="Upload Image"
        onPress={onUploadImage}
        disabled={uploading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: "center",
    justifyContent: "center", // Centra los elementos verticalmente
  },
});
