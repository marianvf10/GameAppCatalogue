import { View, Text, Button, StyleSheet, Platform } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { PracticeContext } from "../../context/PracticeContext";

const MyDatePicker = () => {
  
  const {date,setDate,setText,newItem, setNewItem} = useContext(PracticeContext);
  
  const [mode,setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event,selectedDate) =>{
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();

    setText(fDate);
    setNewItem({...newItem, releaseDate: fDate })

  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  return (
    <View style={styles.container}>

      <View style = {{margin:20}}>
        <Button title='Ingresar fecha estreno' onPress={() =>{showMode('date')}}/>
      </View>

      {show && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode={mode}
        display='default'
        is24Hour={true}
        onChange={onChange}
        />
      )}
    </View>
  );
};

export default MyDatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
