import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";

interface CategoryPickerProps {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  categories: string[];
  enabled: boolean;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedValue,
  onValueChange,
  categories,
  enabled,
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        enabled={enabled}
        style={styles.picker}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default CategoryPicker;
