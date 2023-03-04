import { View, Text, Button, FlatList, Image } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { onSnapshot } from "firebase/firestore";
import { styles } from "./style";
import { getReferenceToBD } from "../../services/games";

export default function GameList() {
  const goDetails = (name, imageUri, price, platform, releaseDate, genre) => {
    navigation.navigate("GameDetails", {
      name,
      imageUri,
      price,
      platform,
      releaseDate,
      genre,
    });
  };
  const navigation = useNavigation();

  const [games, setGames] = useState([]); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Add" onPress={() => navigation.navigate("Add")} />
      ),
    });
  }, []);

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
    });
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
    let prc = "$ " + price;
    return (
      <View style={styles.list}>
        <Image source={{ uri: imageUri }} style={styles.listImage} />

        <View style={styles.listingRatingContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.name}>{prc}</Text>
            <Text style={styles.name}>{platform}</Text>
            <Button
              onPress={() =>
                goDetails(name, imageUri, price, platform, releaseDate, genre)
              }
              title="Details"
            />
          </View>
          <View></View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Popular Games</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderList(item)}
      />
    </View>
  );
}
