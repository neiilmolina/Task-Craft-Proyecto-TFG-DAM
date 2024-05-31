import { View, Text, StyleSheet } from "react-native";
import DiaryFormStyles from "./styles/DiaryFormStyles";
import React, { useState } from "react";
import MyInput from "../../../app/components/MyInput";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiaryUI } from "../store/interfaces";
import { useDiaryActions } from "../hooks/useDiaryActions";
import MyButton from "../../../app/components/MyButton";

type DetailsDiaryScreenNavigationProp = StackNavigationProp<
  ListNavigationParamList,
  "List"
>;

interface DetailsDiaryScreenProps {
  navigation: DetailsDiaryScreenNavigationProp;
  route: { params: { diary: DiaryUI } }; // Corrige la definición de los props de ruta
}

const Details: React.FC<DetailsDiaryScreenProps> = ({ navigation, route }) => {
  const { diary } = route.params;
  const { removeDiary, editExistingDiary } = useDiaryActions();
  const [title, setTitle] = useState<string>(diary.title);
  const [description, setDescription] = useState<string>(diary.description);

  const handleExistingDiary = () => {
    const updatedTask: DiaryUI = {
      title,
      description,
      date: diary.date,
      user_id: diary.user_id,
      id: diary.id,
    };
    editExistingDiary(diary.id, updatedTask);
  };

  const handleDeleteDiary = () => {
    removeDiary(diary.id);
    navigation.goBack(); // Vuelve a la pantalla anterior después de eliminar la tarea
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titulo</Text>
      <MyInput value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Descripición</Text>
      <MyInput
        style={styles.description}
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.buttons}>
        <MyButton
          style={styles.MyButton}
          title="Editar"
          onPress={handleExistingDiary}
        />
        <MyButton
          style={[styles.MyButton, { backgroundColor: "#F89797" }]}
          title="Eliminar"
          onPress={handleDeleteDiary}
        />
      </View>
    </View>
  );
};

const styles = DiaryFormStyles;
export default Details;
