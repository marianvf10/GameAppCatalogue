import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { database } from "../../../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./style";

export default function Game({
  name,
  platform,
  price,
  genre,
  releaseDate,
  imageUri,
}) {
  const source = {uri:imageUri }
  
  return (
    <View style={styles.gameContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text>{platform}</Text>
      <Text>{price}</Text>
      <Text>{genre}</Text>
      <Text>{releaseDate}</Text>
      <View style={styles.imageContainerr}>
        <Image
          source={source} style = {styles.image}
        />
      </View>
    </View>
  );
};