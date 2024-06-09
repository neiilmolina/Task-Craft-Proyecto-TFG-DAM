import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import DiaryHeader from "../components/DiaryHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { ListNavigationParamList } from "../navigation/ListDiaryNavigation";
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
  const { diaries, loading, error } = useDiaryLoader();

  // Crear una copia de los diarios y ordenarlos por fecha reciente
  const sortedDiaries = [...diaries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <View style={styles.container}>
      <DiaryHeader lastDiary={sortedDiaries[0]} navigation={navigation} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1A659E" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.diaryContainer}>
          {sortedDiaries.map((diary, index) => (
            <View
              style={[
                styles.diaryWrapper,
                (index + 1) % 3 !== 0 && { marginRight: 20 },
              ]}
              key={diary.id}
            >
              <Diary navigation={navigation} diary={diary} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  diaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 10,
  },
  diaryWrapper: {
    width: Dimensions.get("window").width / 3 - 20,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
});
