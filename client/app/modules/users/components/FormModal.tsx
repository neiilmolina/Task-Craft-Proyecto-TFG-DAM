import React, { useState } from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import MyInput from "../../../components/MyInput";
import MyButton from "../../../components/MyButton";

interface FormModalProps {
  label: string;
  placeholder: string;
  onSave: (value: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({
  label,
  placeholder,
  onSave,
  isVisible,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    onSave(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{label}:</Text>
          <MyInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={placeholder}
          />
          <View style={styles.Buttons}>
            <MyButton style={styles.MyButton} title="Save" onPress={handleSave} />
            <MyButton style={[styles.MyButton, {backgroundColor:"#F89797"}]} title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    gap:10,
  },
  input: {
    height: 50,
  },
  Buttons: {
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    gap:10,
  },
  MyButton: {
    width: 120,
    height: 50,
  },
});

export default FormModal;
