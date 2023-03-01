import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    title: {
        fontWeight:'300',
        fontSize: 26,
        marginLeft: 10,
        marginVertical: 10,
        color: '#333333'
    },
    list: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    listImage: {
        width: '100%',
        height: 200,
    },
    listingRatingContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    name: {
        fontWeight:'500',
        fontSize: 17, 
        color: '#333333'
    }
    
})