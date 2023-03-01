import { View, Button } from "react-native";
import { useState } from "react";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../ImageViewer/ImageViewer";
import { styles } from "./style";

const CurryImagePicker = ({ addImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

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

    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.button}>
        <Button title="Elegir Imagen" onPress={pickImageAsync} />
      </View>
    </View>
  );
};

export default CurryImagePicker;
