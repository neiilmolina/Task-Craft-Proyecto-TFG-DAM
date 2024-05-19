import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

const useCurrentUser = () => {
  const [loading, setLoading] = useState(true); // Estado de carga
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Una vez que se haya cargado el usuario, cambia el estado de carga a false
    });

    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []);

  return { user, loading }; // Devuelve también el estado de carga
};

export default useCurrentUser;
