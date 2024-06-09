import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyInput from "../../../components/MyInput";
import MyButton from "../../../components/MyButton";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { DiaryUIWithID } from "../store/interfaces";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";
import DiaryFormStyles from "./styles/DiaryFormStyles";
import { useTextCounter } from "../../../hooks/useTextCounter";
import {
  validateTitle,
  validateDescription,
  maxLengthDescription,
  maxLengthTitle,
} from "../validations/validations";
import { useDiaryActions } from "../hooks/useDiaryActions";
import { scheduleNotificationForDiary } from "../notifications/diaryNotifications";

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
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const { length: titleLength } = useTextCounter(title);
  const { length: descriptionLength } = useTextCounter(description);

  const handleAddDiary = async () => {
    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);

    if (titleError || descriptionError) {
      setErrors({
        title: titleError,
        description: descriptionError,
      });
      return;
    }

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

    // Añadir el diario
    addNewDiary(newDiary);

    // Programar una notificación un día después de añadir el diario
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await scheduleNotificationForDiary({
      ...newDiary,
      date: tomorrow.toISOString(),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Título ({titleLength}/{maxLengthTitle}):
      </Text>
      <MyInput
        value={title}
        onChangeText={setTitle}
        maxLength={maxLengthTitle}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}
      <Text style={styles.label}>
        Descripción ({descriptionLength}/{maxLengthDescription}):
      </Text>
      <MyInput
        style={styles.description}
        value={description}
        onChangeText={setDescription}
        maxLength={maxLengthDescription}
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}
      <MyButton title="Añadir diario" onPress={handleAddDiary} />
    </View>
  );
};

const styles = StyleSheet.create(DiaryFormStyles);

export default AddDiaryScreen;
