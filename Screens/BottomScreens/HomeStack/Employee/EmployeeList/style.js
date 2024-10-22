import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    filterInput: {
        borderWidth: 1,
        borderColor: "#1AD0FF",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        backgroundColor: '#fff'
    },

    search: {
        width: "90%",
    },

    searchIcon: {
        width: 24,
        height: 24,
        marginVertical: '3%',
    },

    ActiveInactiveContainer: {
        paddingHorizontal: "5%",
        paddingVertical: '3%',
    },

    button: {
        backgroundColor: 'red',
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    Text: {
        color: "#fff"
    },

    StatusTouchable: {
        width: 144,
        height: 48,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#1AD0FF',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        marginTop: '3%'
    },

    StatusTouchableText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21.28,
        color: '#3A3A3A',
    },

    dropdown: {
        width: 144,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#1AD0FF",
        backgroundColor: '#fff',
    },

    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#1AD0FF",
    },

    dropdownOptionText: {
        fontSize: 16,
    },

    container: {
        alignItems: 'center'
    },

    activityIndicator: {
        marginTop: '50%',
    },

    card: {
        width: '90%',
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#A4CED8',
        backgroundColor: "#F4FDFF",
        justifyContent: 'center',
    },

    cardBottom: {
        marginBottom: "10%"
    },

    cardtop: {
        padding: 10,
        flexDirection: 'row',
    },

    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        borderWidth: 1,
    },

    iconStyle: {
        width: 58,
        height: 58,
        borderRadius: 58,
        borderWidth: 1,
        borderColor: "#0A60F1",
        justifyContent: "center",
        alignItems: 'center',
    },

    NameContainer: {
        gap: 10,
        paddingTop: 10
    },

    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#00275C',
        lineHeight: 26.6
    },

    name1: {
        fontSize: 20,
        fontWeight: '700',
        color: '#00275C',
        // lineHeight: 26.6
        marginTop: '50%'
    },

    depname: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 21.26
    },

    fontsize: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 21.28
    },

    phoneEmail: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        padding: 10,
        width: '100%'
    },

    gap: {
        gap: 5,
    },
})

export default styles;