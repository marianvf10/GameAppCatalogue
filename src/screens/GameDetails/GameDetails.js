import { View, Text } from 'react-native'
import React from 'react'

const GameDetails = ({ route }) => {
  const {name} = route.params;
  const {price} = route.params;
  const {imageUri} = route.params;
  const {platform} = route.params;
  const {releaseDate} = route.params;
  const {genre} = route.params;

  return (
    <View>
      <Text>GameDetails</Text>
      <Text>name: {JSON.stringify(name)}</Text>
      <Text>price: {JSON.stringify(price)}</Text>
      <Text>platform: {JSON.stringify(platform)}</Text>
      <Text>genre: {JSON.stringify(genre)}</Text>
      <Text>releaseDate: {JSON.stringify(releaseDate)}</Text>
  
    </View>
  )
}

export default GameDetails;