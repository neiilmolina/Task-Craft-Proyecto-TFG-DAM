import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MyInput from "../../../app/components/MyInput";
import { useDiaryActions } from "../hooks/useDiaryActions";
import MyButton from "../../../app/components/MyButton";

import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { DiaryUIWithID } from "../store/interfaces";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

import { StackNavigationProp } from "@react-navigation/stack";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";
import DiaryFormStyles from "./styles/DiaryFormStyles";

type AddDiaryScreenNavigationProp = StackNavigationProp<
  ListNavigationParamList,
  "List"
>;

interface AddDiaryScreenProps {
  navigation: AddDiaryScreenNavigationProp;
}

const AddDiaryScreen: React.FC<AddDiaryScreenProps> = ({ navigation }) => {
  const { addNewDiary } = useDiaryActions();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAddDiary = () => {
    const userId = FIREBASE_AUTH.currentUser.uid;
    const date = new Date(Date.now()).toISOString();
    const id = uuidv4();

    const newDiary: DiaryUIWithID = {
      id,
      date,
      title,
      description,
      user_id: userId,
    };
    console.log(newDiary);
    addNewDiary(newDiary);
    navigation.goBack();
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
      <MyButton title="Añadir diario" onPress={handleAddDiary} />
    </View>
  );
};

const styles = DiaryFormStyles;

export default AddDiaryScreen;
