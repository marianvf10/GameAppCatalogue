import React from 'react'
import {Text,StyleSheet} from 'react-native'

export function Title(props){
    const cls = props.class;
    const name = props.name;
    let stylesArray;

    switch (cls) {
        case 'main':
            stylesArray = [styles.general];
            break;
    
        default:
            stylesArray = [styles.general,styles.otro];

            break;
    }

    return <Text style={stylesArray} >{name}</Text>;
}

const styles = StyleSheet.create(
    {
        general:
        {
            color:'white',
            alignSelf:'center',
            fontSize:50
        },

        otro:
        {
            fontSize:10
        }
    }
)