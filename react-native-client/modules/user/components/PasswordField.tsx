import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordField = ({ label, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePasswordChange = () => {
    // Aquí puedes implementar la lógica para verificar la contraseña actual
    // y cambiarla a la nueva contraseña si la verificación es exitosa
    // Por simplicidad, aquí solo actualizamos el valor del campo de contraseña
    onSave(newPassword);
    setModalVisible(false);
  };

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (passwordType === "new") {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>{label}:</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Change {label}:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Current Password"
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity
                onPress={() => togglePasswordVisibility("current")}
                style={styles.passwordVisibilityButton}
              >
                <Ionicons name={showCurrentPassword ? "eye-off" : "eye"} size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity onPress={() => togglePasswordVisibility("new")} style={styles.passwordVisibilityButton}>
                <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm New Password"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => togglePasswordVisibility("confirm")}
                style={styles.passwordVisibilityButton}
              >
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Button title="Save" onPress={handlePasswordChange} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
  },
  passwordVisibilityButton: {
    position: "absolute",
    right: 10,
  },
});

export default PasswordField;
