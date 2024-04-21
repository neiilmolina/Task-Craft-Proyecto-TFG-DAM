import React from "react";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types"; // Suponiendo que tienes un archivo de tipos con la definición de las rutas

import Header from "./Header";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "NombreDeLaRuta">; // Reemplaza "NombreDeLaRuta" con el nombre de la ruta correspondiente
};

export default function AnotherScreen({ navigation }: Props) {
  return (
    <View>
      <Header navigation={navigation} />
      {/* Resto del contenido de la pantalla */}
    </View>
  );
}
