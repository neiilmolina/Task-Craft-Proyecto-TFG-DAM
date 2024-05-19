import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from "react-native";

const UpdateField = ({ label, value, onSave }) => {
  const [inputValue, setInputValue] = useState(value);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = () => {
    onSave(inputValue);
    setModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.fieldContainer}>
      <Text>{label}:</Text>
      <Text>{inputValue}</Text>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>New {label}:</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
});

export default UpdateField;
