import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MyDatePicker from "../components/DatePicker";
import * as ImagePicker from 'expo-image-picker';
import {database} from '../../config/firebase'
import { collection, addDoc } from "firebase/firestore";
export default function Add() {


   
  const [data, setData] = useState('');

  const onChangeDate = (childData) => {
    
    let releaseDate = new Date(childData);
    let rDate = releaseDate;
    //setData(childData);
    setNewItem({...newItem,releaseDate:rDate});
};
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);

  const onSend = async ()=> {
    await addDoc(collection(database,'games'),newItem);
    navigation.goBack();
  }
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const [newItem, setNewItem] = React.useState({
    name: "",
    platform: "",
    price: 0,
    genre: "",
    createAt: new Date(),
    releaseDate: "",
    image: ""
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell a New Product</Text>
      <TextInput style={styles.inputContainer} 
      placeholder="Product Name"
      onChangeText={(text)=>setNewItem({...newItem,name:text})} />
      <TextInput style={styles.inputContainer} 
      placeholder="Platform"
      onChangeText={(text)=>setNewItem({...newItem,platform:text})} />
      <TextInput
        style={styles.inputContainer}
        placeholder="Price"
        keyboardType="numeric"
        onChangeText={(text)=>setNewItem({...newItem,price:text})}
      />
      <TextInput style={styles.inputContainer} 
      placeholder="Genre"
      onChangeText={(text)=>setNewItem({...newItem,genre:text})} />
      <MyDatePicker onChangeDate = {onChangeDate}/>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}
          onPress={pickImageAsync}>
          <Text style={styles.text}>Choose a photo</Text>
        </Pressable>
        <Text>{selectedImage}</Text>
        <Pressable style={styles.button}
          onPress={onSend}>
          <Text style={styles.text}>Submit</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('GameList')}
        >
          <Text style={styles.text}>Go to home screen</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  inputContainer: {
    width: "90%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    margin: 12,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems:"stretch",
    justifyContent:"space-between",
    width: 320,
    height: 130,
  
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    height:30,
    
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  imagen: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
});
