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

    pagination: {
        marginVertical: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '50%',
    },

    filterInput: {
        borderWidth: 1,
        borderColor: "#1AD0FF",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        margin: 20,
        backgroundColor: '#fff'
    },

    search: {
        width: "90%",
        paddingVertical:'3%'
    },

    searchIcon: {
        width: 24,
        height: 24,
        // marginTop: '3%',
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
        lineHeight: 26.6,
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

    Buttonview: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginVertical: '5%' },
    Checkout: { width: '35%', height: 38, backgroundColor: '#0A62F1', borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
    CheckoutActive: { width: '35%', height: 38, backgroundColor: '#00275C', borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
    CheckoutText: { color: '#fff', fontWeight: '700', fontSize: 15 },
    ViewDetails: { width: '35%', height: 38, borderWidth: 1, borderColor: '#0A62F1', borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
    DetailsText: { color: '#0A62F1', fontWeight: '700', fontSize: 15 }
})

export default styles;