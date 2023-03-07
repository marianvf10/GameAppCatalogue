import { View, Text, StyleSheet,Button } from 'react-native'
import { Title } from './Titles'
import { NavButton } from '../../components/Button/Button'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'

export default function Home() {

  return (
    <View style={styles.background}>
      <Title name='GameStore' class='main'></Title>
      <NavButton width={270} height={100} name='Add' nav='Add' />
      <NavButton width={270} height={100} type='small' name='Game list' nav='GameList' />
      <Text style={styles.text}>Esta aplicacion funciona como la tienda virtual de videojuegos de nuestro dominio.Permite ver los videojuegos del catalogo,inspeccionarlos en detalle y realizar carga de nuevos juegos.</Text>
    </View>
  );
}
