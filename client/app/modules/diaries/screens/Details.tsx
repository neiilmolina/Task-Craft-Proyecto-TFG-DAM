import { View, Text, StyleSheet } from "react-native";
import DiaryFormStyles from "./styles/DiaryFormStyles";
import React, { useState } from "react";
import MyInput from "../../../components/MyInput";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiaryUI, DiaryUIWithID } from "../store/interfaces";
import { useDiaryActions } from "../hooks/useDiaryActions";
import MyButton from "../../../components/MyButton";
import { useTextCounter } from "../../../hooks/useTextCounter";
import {
  validateTitle,
  validateDescription,
  maxLengthDescription,
  maxLengthTitle,
} from "../validations/validations";

type DetailsDiaryScreenNavigationProp = StackNavigationProp<
  ListNavigationParamList,
  "List"
>;

interface DetailsDiaryScreenProps {
  navigation: DetailsDiaryScreenNavigationProp;
  route: { params: { diary: DiaryUIWithID } };
}

const Details: React.FC<DetailsDiaryScreenProps> = ({ navigation, route }) => {
  const { diary } = route.params;
  const { removeDiary, editExistingDiary } = useDiaryActions();
  const [title, setTitle] = useState<string>(diary.title);
  const [description, setDescription] = useState<string>(diary.description);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const { length: titleLength } = useTextCounter(title);
  const { length: descriptionLength } = useTextCounter(description);

  const handleSaveDiary = () => {
    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);

    if (titleError || descriptionError) {
      setErrors({
        title: titleError,
        description: descriptionError,
      });
      return;
    }

    const updatedTask: DiaryUI = {
      title,
      description,
      date: diary.date,
      user_id: diary.user_id,
    };
    editExistingDiary(diary.id, updatedTask);
    setIsEditing(false);
    navigation.goBack();
  };

  const handleDeleteDiary = () => {
    removeDiary(diary.id);
    navigation.goBack();
  };

  const handleCancelEdit = () => {
    setTitle(diary.title);
    setDescription(diary.description);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Título ({titleLength}/{maxLengthTitle}):
      </Text>
      <MyInput
        value={title}
        onChangeText={setTitle}
        editable={isEditing}
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
        editable={isEditing}
        maxLength={maxLengthDescription}
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}
      <View style={styles.buttons}>
        {isEditing ? (
          <>
            <MyButton
              style={styles.MyButton}
              title="Guardar"
              onPress={handleSaveDiary}
            />
            <MyButton
              style={[styles.MyButton, { backgroundColor: "#F89797" }]}
              title="Cancelar"
              onPress={handleCancelEdit}
            />
          </>
        ) : (
          <>
            <MyButton
              style={styles.MyButton}
              title="Editar"
              onPress={() => setIsEditing(true)}
            />
            <MyButton
              style={[styles.MyButton, { backgroundColor: "#F89797" }]}
              title="Eliminar"
              onPress={handleDeleteDiary}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create(DiaryFormStyles);

export default Details;
