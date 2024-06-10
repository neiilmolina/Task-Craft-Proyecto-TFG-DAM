import { useState } from 'react';
import { Alert } from 'react-native';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FIREBASE_STORAGE } from '../../../../../FirebaseConfig';

const useImageUpload = (user, image) => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No Image', 'Please select an image before uploading.');
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const storageRef = ref(FIREBASE_STORAGE, `${user.email}/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      setUploading(true);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Handle upload progress if needed
          },
          (error) => {
            setUploading(false);
            Alert.alert('Error', error.message);
            reject(error);
          },
          async () => {
            setUploading(false);
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', error.message);
      throw error;
    }
  };

  return {
    uploading,
    uploadImage,
  };
};

export default useImageUpload;
