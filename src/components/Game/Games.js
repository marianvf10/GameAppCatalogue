import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { database } from "../../../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import ImageViewer from "../ImageViewer/ImageViewer";
import { styles } from "./style";

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
};