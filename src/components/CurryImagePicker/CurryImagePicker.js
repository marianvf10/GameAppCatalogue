import { View, Text, Image, Button, StyleSheet} from 'react-native'
import { useState, useEffect, useContext } from 'react';
import React from 'react'
import * as ImagePicker from "expo-image-picker";
import { PracticeContext } from '../../../context/PracticeContext';
import ImageViewer from '../ImageViewer/ImageViewer';
import { styles } from './style';

const CurryImagePicker = () => {

    const {selectedImage, setSelectedImage} = useContext(PracticeContext);
    
    const PlaceholderImage = ''; //ruta de prueba para probar ImagePicker

    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
    
        setSelectedImage(result.assets[0].uri);
      
      
    };
  
    return (
    <View style={styles.container}>
      <View style = {styles.imageContainer}>
      <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
        <View style={styles.button}>
            <Button title="Elegir Imagen" onPress={pickImageAsync}/>
        </View>
    </View>
  )
}

export default CurryImagePicker;
