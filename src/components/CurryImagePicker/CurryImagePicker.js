import { View } from "react-native";
import { useState } from "react";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../ImageViewer/ImageViewer";
import { styles } from "./style";
import { FontAwesome } from '@expo/vector-icons';
import { ActionButton } from "../Button/Button";

const CurryImagePicker = ({ addImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [elementVisible, setElementVisible] = useState(true);//Indica si hay el icono de camara de fotos es visible.

  const PlaceholderImage = ""; //ruta de prueba para probar ImagePicker

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const source = result.assets[0].uri;
      setSelectedImage(source);
      addImage(source);
    };

    setElementVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      {/*Condicional que indica si debe o no aparecer el icono de camara de fotos, en funcion de si ya se cargo
      una imagen */}
      {elementVisible?<FontAwesome name="camera" size={24} color="#D27D2D" style={styles.icon}/>:null}
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.button}>
        <ActionButton name="Upload image" action={pickImageAsync}/>
      </View>
    </View>
  );
};

export default CurryImagePicker;
