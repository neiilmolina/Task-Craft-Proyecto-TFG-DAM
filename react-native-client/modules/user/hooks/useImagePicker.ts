import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const useImagePicker = (initialImage) => {
  const [image, setImage] = useState(initialImage);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return {
    image,
    pickImageFromGallery,
    takePhotoWithCamera,
  };
};

export default useImagePicker;
