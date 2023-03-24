import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./style";
import { ActionButton } from "../../components/Button/Button";
import { Ionicons } from '@expo/vector-icons';
import { fetchGames, fetchMoreGames} from "../../services/games";


export default function GameList() {
  const goDetails = (name, imageUri, price, platform, releaseDate, genre) => {
    navigation.navigate("GameDetails", { name, imageUri, price, platform, releaseDate, genre });
  }
  const navigation = useNavigation();

  const [games, setGames] = useState([]); 
  const [emptyStore, setEmptyStore] = useState(true); //Marca si ya hay juegos registrados en la tienda
  const [gamesPerLoad] = useState(5); 
  const [startAfter,setStartAfter] = useState(Object);
  const [lastGame,setLastGame] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const gamesData = await fetchGames(gamesPerLoad,"price");
    setGames([...games, ...gamesData.posts]);
    setStartAfter(gamesData.lastVisible);
    if (gamesData.posts.length !=0){
      setEmptyStore(false);
    }
  }

  async function getMoreGames() {
    if (!lastGame) {
      const gamesData = await fetchMoreGames("price",startAfter,gamesPerLoad);
      setGames([...games, ...gamesData.posts]);
      setStartAfter(gamesData.lastVisible);
      gamesData.posts.length == 0?setLastGame(true):setLastGame(false);
    }
  }

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
      
      {/*Condicional encargado de mostrar/ocultar aviso de inexistencia de juegos en la BD*/}
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
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => renderList(item)}
        onEndReached={getMoreGames}
        onEndReachedThreshold = {0.01}
        scrollEventThrottle= {150}
        ListFooterComponent={ !lastGame && <ActivityIndicator  color = "#FFAC1C" size="large"/>
        }
      />
    </View>
  );
}
