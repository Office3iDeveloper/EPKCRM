import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    Container: {
        // alignItems: 'center',
        marginVertical: '20%'
    },

    dept: {
        color: '#0A62F1',
        fontWeight: '600',
        fontSize: 18,
        marginTop: -5,
    },

    date: {
        paddingVertical: '3%',
        fontWeight: '600',
        fontSize: 15,
        color: '#00275C'
    },

    ctc: {
        fontWeight: '400',
        fontSize: 15,
        color: '#00275C'
    },

    Card: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#00275C',
        paddingVertical: 10,
        width: "75%",
    },

    ImgCard: {
        backgroundColor: '#fff',
        width: 66,
        height: 66,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },

    Img: {
        width: 66,
        height: 66,
        borderColor: '#fff',
        borderWidth: 1
    },

    Name: {
        color: '#00275C',
        fontSize: 18,
        fontWeight: '700',
    },

    Role: {
        color: '#00275C',
        fontSize: 13,
        fontWeight: '400',
        marginVertical: '3%'
    },

})

export default styles;