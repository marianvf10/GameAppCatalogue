import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {database} from '../../config/firebase';
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {AntDesign} from '@expo/vector-icons';

export default function Game({
    id,
    name,
    platform,
    price,
    genre,
    releaseDate,
    image
}) {
    return (
        <View style ={styles.gameContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.price}>{genre}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    gameContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray',
    },
    platform: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    genre: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
   },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});