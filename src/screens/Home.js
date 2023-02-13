import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { database } from '../../config/firebase';
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import Game from '../components/Games';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {

  const navigation = useNavigation();

  const [games, setGames] = useState([]); //inicializo como arreglo vacio

  React.useEffect(() => {
    const collectionRef = collection(database,'games');
    const q = query(collectionRef,orderBy('price','desc')) //de esta manera hacemos el fetch a nuestra bd


    const unsuscribe = onSnapshot(q, querySnapshot => {
      setGames(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          platform: doc.data().platform,
          price: doc.data().price,
          createAt: doc.data().createAt,
          genre: doc.data().genre
        }))
      )
    })
    return unsuscribe;
  },[])

  return (
    <ScrollView>

      <Text>Games</Text>
      {games.map(game => <Game key={game.id} {...game}/>)}
      <Button title='go to add screen' onPress={() => navigation.navigate('Add')}/>
    
    </ScrollView>
    
  )
}