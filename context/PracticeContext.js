import { useState } from 'react'
import { View, Text } from 'react-native'
import React from 'react'

const PracticeContext = React.createContext();

const PracticeProvider = ({children})=> {
    const [date,setDate] = useState(new Date());
    const [selectedImage,setSelectedImage] = useState(null);
    const [text,setText] = useState('empty');

    const [newItem, setNewItem] = React.useState({
        name: "",
        platform: "",
        price: 0,
        genre: "",
        createAt: new Date(),
        releaseDate: "",
        image: "",
      });
    

    return (
        <PracticeContext.Provider value = {{
            date,setDate,selectedImage,setSelectedImage, text,setText, newItem,setNewItem
        }}>
            {children}
        </PracticeContext.Provider>
    )
}

export {PracticeContext,PracticeProvider}