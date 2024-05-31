import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { format } from "date-fns";
import { DiaryUI } from "../store/interfaces";

interface DiaryProps {
  diary: DiaryUI;
  navigation: any;
}

const Diary: React.FC<DiaryProps> = ({ diary, navigation }) => {
  return (
    <TouchableOpacity key={diary.id} onPress={() => navigation.navigate("Detalles del diario", { diary })}>
      <View style={styles.diary}>
        <Text style={styles.diaryText}>{diary.title}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{format(diary.date, "yyyy-MM-dd")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Diary;

const styles = StyleSheet.create({
  diary: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffff",
    padding: 20,
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
