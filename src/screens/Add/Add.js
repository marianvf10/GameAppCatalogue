import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState} from "react";
import { Text} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import MyDatePicker from "../../components/DatePicker/DatePicker";
import CurryImagePicker from "../../components/CurryImagePicker/CurryImagePicker";
import { ActionButton } from "../../components/Button/Button";
import { styles } from "./style";
import { uploadGame } from "../../services/games";

export default function Add() {
  const navigation = useNavigation();
 
  //este es el estado del objeto que se tiene que guardar, estos atributos se reciben del usuario
  const [newItem, setNewItem] = useState({
    name: "",
    platform: "",
    price: 0,
    genre: "",
    releaseDate: "",
  });

  const [addD, setNewDate] = useState("");
  const [selectedImage, setNewImage] = useState(null);

  //con esta funcion agrego un nuevo documento a la bd
  const onSend = async () => {
    await uploadGame(newItem,selectedImage);
    navigation.goBack();
  };

  //con esta funcion recibo informacion del componente DatePicker
  const addDate = (newDate) => {
    setNewDate(newDate.toString());
    setNewItem({ ...newItem, releaseDate: newDate });
  };

  //con esta funcion recibo informacion del componente CurryImagePicker
  const addImage = (newImage) => {
    setNewImage(newImage);
  };

  //Cambiar placeholder a negritas
  return (
      
      <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={styles.title}>Add a New Game</Text>
      <CurryImagePicker addImage={addImage} />
      <TextInput
        style={styles.inputContainer}
        placeholderTextColor="white"
        placeholder="Product Name"
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <TextInput
        style={styles.inputContainer}
        placeholderTextColor="white"
        placeholder="Platform"
        onChangeText={(text) => setNewItem({ ...newItem, platform: text })}
      />
      <TextInput
        style={styles.inputContainer}
        placeholderTextColor="white"
        placeholder="Price"
        keyboardType="numeric"
        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
      />
      <TextInput
        style={styles.inputContainer}
        placeholderTextColor="white"
        placeholder="Genre"
        onChangeText={(text) => setNewItem({ ...newItem, genre: text })}
      />
      <MyDatePicker addDate={addDate} />
        <ActionButton name="Upload game" action={onSend}/>
    </ScrollView>
    
  );
}
