import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

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

    StatDateText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        width: "90%",
        color: '#2C2C2C',
    },

    inputs: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        height: 52,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
    },

    inputs1: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        height: 152,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
    },

    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%"
    },

    HeaderButtonActive: {
        width: '25%',
        height: 40,
        borderRadius: 7,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A60F1',
        borderColor: '#0A60F1',
    },

    HeaderButtonTextActive: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18.62
    },

    HeaderButton: {
        width: "25%",
        height: 40,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#0A60F1',
        alignItems: 'center',
        justifyContent: 'center'
    },

    HeaderButtonText: {
        color: '#0A60F1',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.62
    },

    listBody: {
        paddingVertical: '1%',
        borderBottomWidth: 0.5,
    },

    Container: {
        marginBottom: '10%'
    },

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
        alignItems: 'center'
    },

    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: '5%'
    },

    Button: {
        width: 136,
        height: 41,
        borderRadius: 5,
        backgroundColor: '#0A62F1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ButtonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 16
    },

    InputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%',
        borderWidth: 1,
        borderColor: '#A4CED8',
        marginVertical: '5%',
        borderRadius: 6,
        justifyContent: 'space-between',
        height: 50
    },

    Input: {
        width: "80%",
        paddingLeft: "5%"
    },

    IconBg: {
        backgroundColor: '#E0F1FC',
        padding: '3%',
        width: "20%",
        alignItems: 'center',
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5
    },

    Tablecontainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
        marginLeft: 20,
        marginRight: 20,
    },

    Activeindicator: {
        height: 150,
        width: 400
    },

    row: {
        flexDirection: 'row',
        borderColor: '#ccc',
    },

    cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
    },

    sno: {
        width: 80,
    },

    DepartmentName: {
        width: 120
    },

    StartDate: {
        width: 120
    },

    EndDate: {
        width: 200
    },

    ShiftSlot: {
        width: 120
    },

    WeekOff: {
        width: 120
    },

    Status: {
        width: 120
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

    pageNo: {
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 18.62,
        paddingHorizontal: '4%'
    },

    PageActive: {
        width: 26,
        height: 26,
        borderRadius: 26,
        backgroundColor: '#0A62F1',
        color: '#fff',
        paddingTop: 5
    },

    listcontentButtonview: {
        width: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
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
        paddingBottom: '10%',
    },

    modalText: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: '600',
    },

    errorTextDelete: {
        color: "red",
        paddingBottom: 10,
        width: "90%"
    },

    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    modalCancelButton1: {
        // backgroundColor: '#ccc',
        borderColor: '#0A62F1',
        borderWidth: 1,
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

    Reason: {
        marginBottom: "5%",
        borderRadius: 5,
        borderColor: '#515151',
        borderWidth: 1,
        paddingLeft: 20,
    },

    StatusTouchable: {
        width: "90%",
        height: 52,
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
        // color: '#000',
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

    Heading:{
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        color: "#000",
    },

    modalLabelText:{
        paddingTop:'5%',
        paddingBottom:'5%'
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

    ModalerrorText: {
        color: "red",
        paddingTop: 10,
    },

    modaldropdown:{
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ccc",
    },

    buttoncontainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop:'10%'
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
})

export default styles;