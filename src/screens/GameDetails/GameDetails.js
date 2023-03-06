import { View, Text, Image} from 'react-native'
import React from 'react'
import {styles} from "./style";
const GameDetails = ({ route }) => {
  const {name} = route.params;
  const {price} = route.params;
  const {imageUri} = route.params;
  const {platform} = route.params;
  const {releaseDate} = route.params;
  const {genre} = route.params;
  console.log(imageUri);
  return (
    <View>
      <Image source={{ uri: imageUri }} style={styles.listImage}/>
      <Text>{JSON.stringify(name)}</Text>
      <Text>price: {JSON.stringify(price)}</Text>
      <Text>platform: {JSON.stringify(platform)}</Text>
      <Text>genre: {JSON.stringify(genre)}</Text>
      <Text>releaseDate: {JSON.stringify(releaseDate)}</Text>

    </View>
  )
}

export default GameDetails;