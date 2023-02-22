import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { database } from "../../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import ImageViewer from "./ImageViewer";

export default function Game({
  name,
  platform,
  price,
  genre,
  releaseDate,
  imageUri,
}) {
  return (
    <View style={styles.gameContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text>{imageUri}</Text>
      <View style={styles.imageContainerr}>
        <Image
          source={{uri: imageUri}} style = {styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    padding: 16,
    height: 320,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  releaseDate: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
  },
  platform: {
    fontSize: 32,
    fontWeight: "bold",
  },
  genre: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0FA5E9",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  imageContainerr: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: "50%",
    height: "50%",
    borderColor: "black",
  },
  image:{
    width:'30%',
    height:'30%',
    borderRadius:2
  }
});
