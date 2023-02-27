import { View, Text, Button, StyleSheet, Platform } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./style";

const MyDatePicker = ({ addDate }) => {
  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Release date undefined');


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    setText(fDate);
    //setNewItem({...newItem, releaseDate: fDate })
    addDate(fDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  return (
    <View style={styles.container}>
       <Text style = {styles.text}>{text}</Text>
      <View style={{ margin: 20 }}>
        <Button
          title="Ingresar fecha estreno"
          onPress={() => {
            showMode("date");
          }}
        />
        
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          is24Hour={true}
          onChange={onChange}
        />
      )}
     
    </View>
  );
};

export default MyDatePicker;