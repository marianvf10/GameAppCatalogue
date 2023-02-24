import { useState } from 'react'
import React from 'react'

const PracticeContext = React.createContext();

const PracticeProvider = ({children})=> {
    const [date,setDate] = useState(new Date());
    const [selectedImage,setSelectedImage] = useState(null);
 

    const [newItem, setNewItem] = React.useState({
        name: "",
        platform: "",
        price: 0,
        genre: "",
        createAt: new Date(),
        releaseDate: "",
        imageUri: "",
      });
    

    return (
        <PracticeContext.Provider value = {{
            selectedImage,setSelectedImage,newItem,setNewItem
        }}>
            {children}
        </PracticeContext.Provider>
    )
}

export {PracticeContext,PracticeProvider}