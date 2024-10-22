import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    PageActive: {
        backgroundColor: '#0A62F1',
        color: '#fff',
    },

    pageNo: {
        fontWeight: '700',
        fontSize: 14,
    },

    pagination: {
        marginVertical: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '50%',
    },

    prev: {
        flexDirection: 'row',
        gap: 10
    },

    Next: {
        flexDirection: 'row',
        gap: 10
    },

    NextText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0A60F1',
        paddingLeft: 10
    },

    prevText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#737373',
        paddingRight: 10
    },

    activityIndicator: {
        marginTop: '50%',
    },

    card: {
        width: '100%',
        borderRadius: 10,
        marginTop: "10%",
        padding: "10%",
        borderWidth: 1,
        borderColor: '#DDE4EF',
        backgroundColor: "#FFF",

    },

    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#00275C',
        lineHeight: 26.6,
        marginTop: '50%'
    },

    name1: {
        fontSize: 20,
        fontWeight: '700',
        color: '#00275C',
        lineHeight: 26.6,
        marginTop: '50%',
        textAlign: 'center'
    },

    ViewDetails: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#0A62F1',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    DetailsText: {
        color: '#0A62F1',
        fontWeight: '600',
        fontSize: 16
    },

    ViewDetails1: {
        width: 117,
        height: 35,
        backgroundColor: '#C6F3FF',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    DetailsText1: {
        color: '#00275C',
        fontWeight: '600',
        fontSize: 16
    },

    divider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: '5%',
        width:'100%',
    }
})

export default styles;