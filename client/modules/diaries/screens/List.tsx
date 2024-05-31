import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import DiaryHeader from "../components/DiaryHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";
import { useAppSelector } from "../../../store/hooks/store";
import Diary from "../components/Diary";
import useDiaryLoader from "../hooks/useDiaryLoader";

type DiaryListScreenNavigationProp = StackNavigationProp<
  ListNavigationParamList,
  "List"
>;

interface DiaryListScreenProps {
  navigation: DiaryListScreenNavigationProp;
}

const List: React.FC<DiaryListScreenProps> = ({ navigation }) => {
  const diaries = useDiaryLoader();
  return (
    <View style={styles.container}>
      <DiaryHeader navigation={navigation} />
      <ScrollView style={styles.diaryContainer}>
        {diaries.map((diary) => (
          <Diary key={diary.id} navigation={navigation} diary={diary} />
        ))}
      </ScrollView>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  diaryContainer: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
});
