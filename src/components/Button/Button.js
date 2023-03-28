import React from 'react'
import {Text,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {styles} from './Styles'

/*fontS es una funcion que automatiza el tamanio del texto de lso botones, en funcion del alto y largo del boton,
y de la cantidad de palabras del texto.

Obtenida a traves de un sistema de 3 ecuaciones(3 botones elegidos como base) y 3 variables(explicadas anteriormente)*/

//Boton con la funcion de navegar a una pagina, siendo la referencia enviada por props..
export function NavButton (props){

    const [navigation,name,nav,w,h]=[useNavigation(),props.name,props.nav,props.width==null? 140:props.width, props.height==null? 35:props.height];;
    const fontS = -0.1573*h + 0.1199*w+2.3602* name.split(' ').length;

    return(
            <TouchableOpacity style = {[styles.button,{height:h,width:w}]} onPress={() => navigation.navigate(nav)}>
            <Text style = {[styles.buttonText,{fontSize:fontS}]}>{name}</Text>
            </TouchableOpacity>

    )
}

//Boton con la funcion de realizar una accion enviada por props.
export function ActionButton(props){
    const [action,name,w,h]=[props.action,props.name,props.width==null? 140:props.width, props.height==null? 35:props.height];
    const fontS = -0.1573*h + 0.1199*w+2.3602* name.split(' ').length;

    return(
            <TouchableOpacity style = {[styles.button,{height:h,width:w}]} onPress={action}>
            <Text style = {[styles.buttonText,{fontSize:fontS}]}>{name}</Text>
            </TouchableOpacity>

    )
}


