import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../../../../FirebaseConfig";

const useCurrentUser = () => {
  // Estados locales para el usuario y el estado de carga
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Función para suscribirse a los cambios en la autenticación del usuario
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser); // Actualiza el estado del usuario
      setLoading(false); // Cambia el estado de carga a false una vez que se haya cargado el usuario
    });

    // Función de limpieza para cancelar la suscripción al listener del estado de autenticación
    return () => unsubscribe();
  }, []);

  // Devuelve el usuario actual y el estado de carga
  return { user, loading };
};

export default useCurrentUser;
