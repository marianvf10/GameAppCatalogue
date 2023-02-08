import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";

const MyDatePicker = (onChangeDate) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: date,
      display: "calendar",
    });
  };

  onFocus = () => {
    showDatepicker();
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        placeholder="choose a date"
        onFocus={onFocus}
        value={date.toDateString()}
        onChangeText={(value) =>  console.log(value)}
      />
    </View>
  );
};

export default MyDatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  inputContainer: {
    minWidth: "90%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    margin: 12,
  },
});
