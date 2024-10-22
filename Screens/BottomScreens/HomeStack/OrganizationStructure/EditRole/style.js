import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    Row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },

    AddroleText: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 21.28,
        color: '#000000',
    },

    TextInput: {
        width: "90%",
        height: 42,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        marginTop: '8%',
        paddingLeft: '5%'
    },

    buttonview: {
        flexDirection: 'row',
        paddingTop: '10%',
        gap: 20,
        justifyContent: 'center'
    },

    submitbutton: {
        backgroundColor: '#0A62F1',
        borderRadius: 5,
        width: 90,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cancelbutton: {
        backgroundColor: '#F4FDFF',
        borderRadius: 5,
        width: 90,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#0A62F1"
    },

    submitbuttonText: {
        fontWeight: '700',
        fontSize: 15,
        lineHeight: 19.95,
        color: '#fff'
    },

    cancelbuttontext: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 19.95,
        color: '#0A62F1'
    },

    errorText: {
        color: "red",
        paddingTop: 10,
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center'
    },

    card: {
        borderRadius: 5,
        marginVertical: '2%',
        width: '100%',
        height: 70,
        justifyContent: 'center',
        paddingLeft: '10%'
    },

    card1: {
        borderRadius: 5,
        marginVertical: '2%',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        paddingLeft: '10%'
    }
})

export default styles