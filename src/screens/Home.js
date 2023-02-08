import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Home() {

  const navigation = useNavigation();

  return (
    <View>
      <Text>home screen</Text>
      <Button title='go to add screen' onPress={() => navigation.navigate('Add')}/>
    </View>
  )
}