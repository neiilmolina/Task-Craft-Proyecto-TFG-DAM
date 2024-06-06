import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { format } from "date-fns";
import { DiaryUIWithID } from "../store/interfaces";

interface DiaryProps {
  diary: DiaryUIWithID;
  navigation: any;
}

const Diary: React.FC<DiaryProps> = ({ diary, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={diary.id}
        onPress={() => navigation.navigate("Detalles del diario", { diary })}
      >
        <View style={styles.diary}>
          <Text>{diary.description.substring(0, 50)}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.diaryText}>{diary.title}</Text>
      <Text style={styles.dateText}>{format(diary.date, "dd-MM-yyyy")}</Text>
    </View>
  );
};

export default Diary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    marginBottom: 25,
  },
  diary: {
    backgroundColor: "#ffff",
    padding: 10,
    height: 100,
    width: 100,
    textAlignVertical: "center",
    marginVertical: 8,
    borderRadius: 10,
    color: "black",
  },
  diaryText: {
    fontSize: 16,
    color: "#1A659E",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "black",
  },
});
