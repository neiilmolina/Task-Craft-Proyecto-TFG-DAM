import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MyButton from "../../../components/MyButton";

interface DateTimeSelectorProps {
  date: Date;
  setDate: (date: Date) => void;
  time: Date;
  setTime: (time: Date) => void;
  error: string | null;
  disabled: boolean;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  date,
  setDate,
  time,
  setTime,
  error,
  disabled,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    hideDatePicker();
    setDate(selectedDate);
  };

  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  const handleConfirmTime = (selectedTime: Date) => {
    hideTimePicker();
    setTime(selectedTime);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text>{date.toDateString()}</Text>
          <MyButton title="Fecha" onPress={showDatePicker} disabled={disabled}/>
        </View>
        <View style={styles.dateContainer}>
          <Text>{time.toLocaleTimeString()}</Text>
          <MyButton title="Hora" onPress={showTimePicker} disabled={disabled}/>
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 5,
    marginBottom: 5,
    textAlign:"center",
  },
});

export default DateTimeSelector;
