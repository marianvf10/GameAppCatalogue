import { View, Text, Image, Button, StyleSheet} from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import * as ImagePicker from "expo-image-picker";
import ImageViewer from './ImageViewer';

const CurryImagePicker = () => {
  
    const [selectedImage, setSelectedImage] = useState(null);

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
  
    return (
    <View style={styles.container}>
      <View style = {styles.imageContainer}>
        <Image source ={selectedImage}/>
      </View>
        <View style={styles.button}>
            <Button title="Elegir Imagen" onPress={pickImageAsync}/>
        </View>
    </View>
  )
}

export default CurryImagePicker;

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center',
        
    },
    imageContainer:{
        borderWidth:1,
        borderColor: 'black',
        width:'80%',
        height: 150,
        backgroundColor:'#eee'
    },
    button:{
        margin:8
    },
    previewImage: {
      width:'100%'
    }
   
})