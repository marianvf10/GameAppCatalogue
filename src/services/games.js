import { firebase} from "../../config/firebase";
import { database } from "../../config/firebase";
import { collection, addDoc, orderBy, query } from "firebase/firestore";


const getReferenceToBD = () => {
  //creamos una referencia a la bd y realizamos una consulta para poder tener un listado inicial de los juegos 
  const collectionRef = collection(database, "games");
  const q = query(collectionRef, orderBy("price", "desc"));
  return q;
}

//con esta funcion agrego un nuevo documento a la bd
const uploadGame = async (obj,newItem,selectedImage) => {
    const url = await uploadImage(selectedImage);
    addAttribute(obj,newItem,url);
    await addDoc(collection(database, "games"), obj);
  };

  const addAttribute = (obj,newItem,downloadUrl) => {
    obj.name = newItem.name;
    obj.platform = newItem.platform;
    obj.price = newItem.price;
    obj.genre = newItem.genre;
    obj.releaseDate = newItem.releaseDate;
    obj.imageUri = downloadUrl;
  };


//funcion para subir la imagen a Firebase storage y obtener una URL de descarga
const uploadImage = async (selectedImage) => {
    const fileName = selectedImage.substring(
      selectedImage.lastIndexOf("/") + 1
    );

    const response = await fetch(selectedImage);
    const blob = await response.blob();
    var ref = firebase.storage().ref(`games/images/${fileName}`);

    try {
      //subo la imagen
      await ref.put(blob);
    } catch (error) {
      console.log(error);
    }
    try {
      //descargo la imagen y retorno el link de descarga
      return await ref.getDownloadURL();
    } catch (error) {
      console.log(error);
    }
  };

  export {uploadGame,getReferenceToBD};