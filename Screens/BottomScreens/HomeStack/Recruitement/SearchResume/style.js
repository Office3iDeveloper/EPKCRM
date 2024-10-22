import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%"
    },

    ShiftSlotContainerTitle: {
        paddingBottom: "5%",
        width: "90%",
    },

    ShiftSlotContainerTitle1: {
        width: "90%",
    },

    ShiftSlotContainerTitleText: {
        color: '#00275C',
        fontWeight: '700',
        lineHeight: 23.94,
        fontSize: 18,
    },

    ShiftSlotContainer: {
        alignItems: 'center',
        marginTop: '10%'
    },

    Inputcontainer: {
        backgroundColor: "#F4FDFF",
        padding: '5%',
        paddingBottom: '10%',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
        alignItems: 'center'
    },

    ShiftSlotText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: '5%',
        width: "90%"
    },

    ShiftSlotTextInput: {
        width: "90%",
        height: 50,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        paddingLeft: 15,
        justifyContent: 'center',
    },

    StatusTouchable: {
        width: "90%",
        height: 50,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
    },

    StatusTouchableText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 19.95,
    },

    buttonview: {
        flexDirection: 'row',
        paddingTop: '10%',
        gap: 20
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

    dropdown: {
        width: "90%",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ccc",
    },

    dropdownOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    dropdownOptionText: {
        fontSize: 16,
    },

    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#00275C',
        lineHeight: 26.6,
        marginVertical: '10%'
    },

    container: {
        alignItems: 'center'
    },

    card: {
        width: '90%',
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: "10%",
        padding: "10%",
        borderWidth: 1,
        borderColor: '#DDE4EF',
        backgroundColor: "#FFF",
    },

    divider: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: '5%',
        width:'100%',
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

    PageActive: {
        backgroundColor: '#0A62F1',
        color: '#fff',
    },

    pageNo: {
        fontWeight: '700',
        fontSize: 14,
    },
})

export default styles;