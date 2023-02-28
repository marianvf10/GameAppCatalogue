import { View, Text, Button } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { database } from '../../../config/firebase';
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import Game from '../../components/Game/Games';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './style';

export default function GameList() {

    const navigation = useNavigation();
  
    const [games, setGames] = useState([]); //inicializo como arreglo vacio

    useLayoutEffect(()=>{
      navigation.setOptions({
        headerRight:()=> <Button title = 'Add' onPress={()=> navigation.navigate('Add')}/>
      })
    },[])
  
    useEffect(() => {
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
            genre: doc.data().genre,
            releaseDate: doc.data().releaseDate,
            imageUri: doc.data().imageUri,
          }))
        )
      })
      return unsuscribe;
    },[])
  
    return (
      <ScrollView>
  
        
        {games.map(game => <Game key={game.id} {...game}/>)}
      
      </ScrollView>
      
    )
  }