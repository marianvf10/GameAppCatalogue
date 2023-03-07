import {
  View,
  Text,
  FlatList,
  Image
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { onSnapshot } from "firebase/firestore";
import { styles } from "./style";
import { ActionButton } from "../../components/Button/Button";
import { Ionicons } from '@expo/vector-icons';
import { getReferenceToBD } from "../../services/games";


export default function GameList() {
  const goDetails = (name, imageUri, price, platform, releaseDate, genre) => {
    navigation.navigate("GameDetails", { name, imageUri, price, platform, releaseDate, genre });
  }
  const navigation = useNavigation();

  const [games, setGames] = useState([]); //inicializo como arreglo vacio
  const [emptyStore, setEmptyStore] = useState(true); //Marca si ya hay juegos registrados en la tienda

  useEffect(() => {

    const q = getReferenceToBD();
    /* a partir de la query realizada, creamos un listener para que cada vez que se cree un nuevo 
    juego en la bd, se actualize automaticamente la lista de juegos*/
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      setGames(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          platform: doc.data().platform,
          price: doc.data().price,
          createAt: doc.data().createAt,
          genre: doc.data().genre,
          releaseDate: doc.data().releaseDate,
          imageUri: doc.data().imageUri,
        }))
      );
      if (setGames.length > 0) {
        setEmptyStore(false);
      }
    }
    );
    return unsuscribe;
  }, []);

  const renderList = ({
    name,
    imageUri,
    price,
    platform,
    releaseDate,
    genre,
  }) => {
    return (
      <View style={styles.list}>
        <Image source={{ uri: imageUri }} style={styles.listImage} />

        <View style={styles.listingRatingContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.name}>{"$ "+price}</Text>
            <Text style={styles.name}>{platform}</Text>
            <ActionButton
              action={() => goDetails(name, imageUri, price, platform, releaseDate, genre)}
              name="Details" />
          </View>
          <View></View>
        </View>
      </View>
    );
  };


  return (
    <View style={[{ flex: 1 }, styles.background]}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Popular Games</Text>
      </View>

      {
        emptyStore?
          <View>
            <Ionicons name="sad-outline" size={90} style={{ alignSelf: 'center', marginTop: 160 }} color="white" />
            <Text style={styles.title}>
              Ups! no games yet...
            </Text>
          </View>:null
      }
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderList(item)}
      />
    </View>
  );
}
