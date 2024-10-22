import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

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

    selectedays: {
        backgroundColor: '#20DDFE',
        padding: 7,
        borderRadius: 7,
        color: '#fff',
        fontWeight: '400',
    },

    ShiftSlotContainerTitle: {
        paddingBottom: "5%",
        width: "90%",
    },
    
    ShiftSlotContainerTitleText: {
        color: '#00275C',
        fontWeight: '700',
        lineHeight: 23.94,
        fontSize: 18,
    },

    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%"
    },

    Input: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        borderRadius: 7,
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    selectedDaysContainer: {
        flexDirection: 'row',
        gap: 5,
        flexWrap: 'wrap',
    },

    selectedays: {
        backgroundColor: '#20DDFE',
        padding: 7,
        borderRadius: 7,
        color: '#fff',
        fontWeight: '400',
    },

    inputs: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        height: 50,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom:'3%',
        justifyContent: 'center',
    },

    container: {
        width: '90%',
        alignItems: 'center'
    },

    imageContainer: {
        marginRight: 5,
        marginTop: 5,
        position: 'relative',
    },

    image: {
        width: 200,
        height: 200,
        marginBottom: 5,
    },

    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: 20,
        padding: 5,
        zIndex: 1,
        backgroundColor: "#fff"
    },

    ShiftSlotContainer: {
        alignItems: 'center',
        paddingBottom: '5%',
        marginVertical:'10%'
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

    ShiftSlotText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        paddingTop: "3%",
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
        justifyContent:'center',
    },

    ShiftSlotTextInput1: {
        width: "90%",
        height: 150,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        paddingLeft: 15,
        paddingTop: 10,
    },

    StatusText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        paddingTop: "3%",
        width: "90%"
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
        paddingRight: "5%",
        paddingLeft: "5%"
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

    modaldropdown:{
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

    fullWidth: {
        width: '100%',
        paddingHorizontal: '5%'
    },

    UploadButton: {
        backgroundColor: '#D4E7EB',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },

    UploadButtonText: {
        color: '#3D3D3D',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 17.92
    },
})

export default styles;