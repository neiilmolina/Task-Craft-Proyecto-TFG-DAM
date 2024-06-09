import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icons from "react-native-vector-icons/FontAwesome6";

interface SettingsOptionProps {
  icon: React.ReactNode;
  title: string;
  value: string | null; // Ahora value puede ser null
  description: string;
  editIcon: boolean;
  onPress: () => void;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({
  icon,
  title,
  value = null,
  description,
  editIcon,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon}
      <View style={styles.optionContainer}>
        <Text style={styles.title}>{title}</Text>
        {value !== null ? <Text style={styles.value}>{value}</Text> : null}
        <Text style={styles.description}>{description}</Text>
      </View>
      {editIcon ? <Icons name="pencil" size={17} /> : <Text>{""}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -17,
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 5,
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
    fontWeight: "400",
  },
  optionContainer: {
    gap: 3,
  },
});

export default SettingsOption;
