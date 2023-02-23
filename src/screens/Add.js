import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {firebase} from '../../config/firebase'
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button, TouchableOpacity
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import MyDatePicker from "../components/DatePicker/DatePicker";
import { database } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import CurryImagePicker from "../components/CurryImagePicker/CurryImagePicker";
import { PracticeContext } from "../../context/PracticeContext";

export default function Add() {
  const { selectedImage,setImageSelected, text, newItem, setNewItem, setDate } = useContext(PracticeContext);

  const navigation = useNavigation();

  //con esta funcion agrego un nuevo documento a la bd
  const onSend = async () => {
    uploadImage();
    await addDoc(collection(database, "games"), newItem);
    setDate('empty');
    navigation.goBack();
    
  };


  const uploadImage = async()=> {
    const response = await fetch(selectedImage);
    const blob = await response.blob();
    const fileName = selectedImage.substring(selectedImage.lastIndexOf('/')+1);
    let storageRef = firebase.storage().ref(`games/images/${fileName}`);

    storageRef.put(blob)
    .on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot=>{
        console.log("snapshot: "+snapshot.state);
        console.log("progress: "+(snapshot.bytesTransferred/snapshot.totalBytes)*100);
     if (snapshot.state === firebase.storage.TaskState.SUCCESS){
       console.log("Success");
     }
      },
      error => {
        unsuscribe();
        console.log('failed loading image'+ error.toString());
      },
      ()=>{
        storageRef.getDownloadURL()
        .then((downloadUrl) => {
        
          setNewItem({ ...newItem, imageUri: downloadUrl})

        })
      }
    );
  }
    

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      ),
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={styles.title}>Add a New Game</Text>
      <CurryImagePicker />
      <TextInput
        style={styles.inputContainer}
        placeholder="Product Name"
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Platform"
        onChangeText={(text) => setNewItem({ ...newItem, platform: text })}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Price"
        keyboardType="numeric"
        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Genre"
        onChangeText={(text) => setNewItem({ ...newItem, genre: text })}
      />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>{text}</Text>
      <MyDatePicker />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSend}>
          <Text style={styles.text}>Subir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    backgroundColor: "#fff",
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
    alignItems: "stretch",
    justifyContent: "space-between",
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
    height: 30,
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
