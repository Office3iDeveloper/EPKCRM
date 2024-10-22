import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    modalCancelButton1: {
        // backgroundColor: '#ccc',
        borderColor:'#0A62F1',
        borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 34,
        borderRadius: 5,
    },

    modalCancelButtonText1: {
        fontSize: 15,
        fontWeight: '400',
        color: '#0A62F1',
    },

    errorText: {
        color: "red",
        paddingTop: 10,
        width: "90%"
    },

    Header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    EditDel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },

    Card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#A4CED8',
        marginHorizontal: '5%',
        marginVertical: '10%',
        padding: '5%',
        borderRadius: 7,
    },

    Designation: {
        color: '#00275C',
        fontSize: 18,
        fontWeight: '700',
        paddingVertical: '3%'
    },

    Vaccancies: {
        color: '#3A3A3A',
        fontSize: 16,
        fontWeight: '400',
        paddingVertical: '3%'
    },

    Description: {
        color: '#00275C',
        fontWeight: '600',
        fontSize: 14,
        paddingVertical: '2%'
    },

    Des: {
        fontWeight: '400',
        fontSize: 14,
        color: '#3A3A3A'
    },

    listcontentdelbutton: {
        width: 36,
        height: 36,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#FF7676",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE0E0'
    },

    listcontenteditbutton: {
        width: 36,
        height: 36,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#76B700",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F6E5'
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
    modalTextHeading: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        color: "#000",
        paddingBottom:'10%',
    },
    Heading:{
        fontSize: 16,
        fontWeight: '800',
        // textAlign: 'center',
        color: "#000",
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
    buttoncontainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop:'10%',
        paddingBottom:'5%',
    },
    modalCancelButton: {
        backgroundColor: '#ccc',
        alignItems:'center',
        justifyContent:'center',
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
        alignItems:'center',
        justifyContent:'center',
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
        alignItems:'center',
        justifyContent:'center',
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
    modalInput:{
        paddingLeft:20,
        borderRadius:7,
        borderWidth:0.5,
        borderColor:"#515151",
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: "5%",
        paddingLeft: "5%"
        
    },
    modalInput1:{
        paddingLeft:20,
        borderRadius:7,
        borderWidth:0.5,
        borderColor:"#515151",
        height: 142,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: "5%",
        paddingLeft: "5%"
        
    },
    modalLabelText:{
        paddingTop:'5%',
        paddingBottom:'5%'
    },

    errorTextDelete: {
        color: "red",
        paddingBottom: 10,
        width:"90%"
    },
})

export default styles;