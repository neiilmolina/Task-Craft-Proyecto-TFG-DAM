import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface SettingsOptionProps {
  icon: string;
  title: string;
  value: string | null; // Ahora value puede ser null
  description: string;
  onPress: () => void;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({
  icon,
  title,
  value = null,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>Ic</Text>
      <View style={styles.optionContainer}>
        <Text style={styles.title}>{title}</Text>
        {value !== null ? <Text style={styles.value}>{value}</Text> : null}
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text>Ic</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal:-17,
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "600",
  },
  value: {
    color: "#1A659E",
  },
  description: {
    fontWeight:"400"
  },
  optionContainer: {
    gap: 3,
  },
});

export default SettingsOption;
