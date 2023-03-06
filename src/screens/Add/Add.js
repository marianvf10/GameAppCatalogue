import { useNavigation } from "@react-navigation/native";
import { useState, useLayoutEffect } from "react";
import { firebase } from "../../../config/firebase";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import MyDatePicker from "../../components/DatePicker/DatePicker";
import { database } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import CurryImagePicker from "../../components/CurryImagePicker/CurryImagePicker";
import {styles} from "./style";
import { ActionButton,NavButton } from "../../components/Button/Button";

export default function Add() {
  const navigation = useNavigation();

  //este objeto es el que se guarda en la bd
  const obj = {
    name: "",
    platform: "",
    price: 0,
    genre: "",
    createAt: new Date(),
    releaseDate: "",
    imageUri: "",
  };

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
    const url = await uploadImage();
    addAttribute(url);
    await addDoc(collection(database, "games"), obj);
    navigation.goBack();
  };

  const addAttribute = (downloadUrl) => {
    obj.name = newItem.name;
    obj.platform = newItem.platform;
    obj.price = newItem.price;
    obj.genre = newItem.genre;
    obj.releaseDate = newItem.releaseDate;
    obj.imageUri = downloadUrl;
  };

  //con esta funcion recibo informacion del DatePicker
  const addDate = (newDate) => {
    setNewDate(newDate.toString());
    setNewItem({ ...newItem, releaseDate: newDate });
  };

  //con esta funcion recibo informacion del CurryImagePicker
  const addImage = (newImage) => {
    setNewImage(newImage);
  };

  //funcion para subir la imagen a Firebase storage y obtener una URL de descarga
  const uploadImage = async () => {
    const fileName = selectedImage.substring(
      selectedImage.lastIndexOf("/") + 1
    );

    const response = await fetch(selectedImage);
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    const blob = await response.blob();
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    const storg = firebase.app().storage('gs://crud-tutorial-92369.appspot.com');
    const storageRef = storg.ref(`games/images/${fileName}`);
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    try {
      //subo la imagen
      await storageRef.put(blob);
    } catch (error) {
      console.log(error);
    }
    try {
      //descargo la imagen y retorno el link de descarga
      return await storageRef.getDownloadURL();
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavButton name="Home" nav = "Home"/>
      ),
    });
  }, []);

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
