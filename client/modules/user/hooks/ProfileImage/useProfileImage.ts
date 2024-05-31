import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";

const useProfileImage = () => {
  const actualUser = FIREBASE_AUTH.currentUser;
  const urlImage = actualUser?.photoURL 
    ? actualUser.photoURL 
    : "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png";
  
  const [image, setImage] = useState<string>(urlImage);

  useEffect(() => {
    if (actualUser?.photoURL) {
      setImage(actualUser.photoURL);
    }
  }, [actualUser]);

  return { image, setImage };
};

export default useProfileImage;
