import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    Container: {
        marginTop: '10%',
        paddingHorizontal: '10%',
        paddingBottom:'10%'
    },

    Button: {
        backgroundColor: '#0A62F1',
        borderRadius: 5,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center'
    },

    HalfButton: {
        backgroundColor: '#0A62F1',
        borderRadius: 5,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
        width: "45%",
    },

    ButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },

    ButtonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '5%'
    },

    primaryButton: {
        height: 90,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#A4CED8',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '10%',
        backgroundColor: '#F4FDFF',
        flexDirection: 'row',
        marginTop: '10%',
    },

    primaryButtonText: {
        fontWeight: '600',
        fontSize: 20,
        color: '#0A62F1'
    },

})

export default styles;