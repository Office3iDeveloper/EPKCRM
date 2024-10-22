import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({

    ModalerrorText: {
        color: "red",
        paddingTop: 10,
    },

    Mbuttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: '20%'
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },

    modalContent1: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
        width: '80%',
        gap:10
    },

    modalTextHeading: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        color: "#000",
        paddingBottom: '10%',
    },

    Heading: {
        fontSize: 18,
        fontWeight: '700',
        color: "#00275C",
    },

    modalText: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: '600',
    },

    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%"
    },

    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: '10%'
    },

    modalCancelButton: {
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 34,
        borderRadius: 5,
    },

    modalCancelButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

    modalDeleteButton: {
        backgroundColor: '#0A62F1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 90,
        height: 34,
    },

    modalDeleteButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

    modalSubmitButton: {
        backgroundColor: '#0A62F1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 90,
        height: 34,
    },

    modalSubmitButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

    Reason: {
        marginBottom: "5%",
        borderRadius: 5,
        borderColor: '#515151',
        borderWidth: 1,
        paddingLeft: 20,
    },

    modalInput: {
        paddingLeft: 20,
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor: "#515151",
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: "5%",
        paddingLeft: "5%"
    },

    modalReasonInput: {
        paddingLeft: 20,
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor: "#515151",
        height: 142,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: "5%",
        paddingLeft: "5%"
    },

    modalLabelText: {
        paddingTop: '5%',
        paddingBottom: '5%'
    },

    errorTextDelete: {
        color: "red",
        paddingBottom: 10,
        width: "90%"
    },

    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%"
    },

    PolicyContainer: {
        alignItems: 'center',
        paddingBottom: '5%'
    },

    PolicyContainerTitleHeader: {
        paddingTop: "5%",
        paddingBottom: "5%",
        width: "90%",
    },

    PolicyContainerTitle: {
        paddingTop: "5%",
        width: "90%",
    },

    PolicyContainerTitleText: {
        color: '#00275C',
        fontWeight: '700',
        lineHeight: 23.94,
        fontSize: 18,
    },

    Inputcontainer: {
        backgroundColor: "#F4FDFF",
        padding: 20,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
        alignItems: 'center'
    },

    TimeSlotText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        paddingTop: "3%",
        width: "90%",
        color: "#2C2C2C",
    },

    Text: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "10%",
        paddingTop: "10%",
        color: "#2C2C2C",
    },

    TimeSlotTouchable: {
        width: "90%",
        height: 42,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: "5%",
        paddingLeft: "5%"
    },

    TimeSlotTouchableText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 19.95,
        color: '#000',
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

    DoubleInputs: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    shortInputs: {
        width: '45%'
    },

    averageWidth: {
        width: '90%'
    },

    input: {
        borderWidth: 1,
        borderColor: "#515151",
        borderRadius: 7,
        height: 42,
        paddingLeft: 10,
        justifyContent: 'center'
    },

    inputs: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        borderRadius: 7,
        paddingLeft: 10,
        height:42
    },

    listcontentButtonview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        width: 100
    },

    listcontenteditbutton: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#76B700",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F6E5'
    },

    listcontentdelbutton: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#FF7676",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE0E0'
    },

    Activeindicator: {
        height: 150,
        width: 400
    },

    errorText: {
        color: "red",
        paddingTop: 10,
        width:"90%"
    },
})

export default styles;