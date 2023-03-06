import React from 'react'
import {Text,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {styles} from './Styles'

export function NavButton (props){

    const [navigation,name,nav,w,h]=[useNavigation(),props.name,props.nav,props.width==null? 140:props.width, props.height==null? 35:props.height];;
    const fontS = -0.1573*h + 0.1199*w+2.3602* name.split(' ').length;
    console.log(fontS)

    return(
            <TouchableOpacity style = {[styles.button,{height:h,width:w}]} onPress={() => navigation.navigate(nav)}>
            <Text style = {[styles.buttonText,{fontSize:fontS}]}>{name}</Text>
            </TouchableOpacity>

    )
}

export function ActionButton(props){
    const [action,name,w,h]=[props.action,props.name,props.width==null? 140:props.width, props.height==null? 35:props.height];
    //eq system 3 vars,h heigth,w width a amountOfWordss
    const fontS = -0.1573*h + 0.1199*w+2.3602* name.split(' ').length;
    console.log(fontS)

    return(
            <TouchableOpacity style = {[styles.button,{height:h,width:w}]} onPress={action}>
            <Text style = {[styles.buttonText,{fontSize:fontS}]}>{name}</Text>
            </TouchableOpacity>

    )
}


