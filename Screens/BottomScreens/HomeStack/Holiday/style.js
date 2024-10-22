import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({

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

    errorTextDelete: {
        color: "red",
        paddingBottom: 10,
        width: "90%"
    },

    Container: {
        marginTop: '10%'
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

    Activeindicator: {
        height: 150,
        width: 400
    },

    listBody: {
        paddingVertical: '2%',
        borderBottomWidth: 0.5
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
        width: 150
    },

    EmployeeName: {
        width: 150
    },

    StartDate: {
        width: 150
    },

    EndDate: {
        width: 150
    },

    ShiftSlot: {
        width: 150
    },

    WeekOff: {
        width: 150
    },

    Status: {
        width: 150
    },

    Action: {
        width: 100
    },

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
        alignItems: 'center'
    },

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
        color: '#0A60F1'
    },

    prevText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#737373'
    },

    pagination: {
        marginVertical: '10%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '50%',
    },

    ModalerrorText: {
        color: "red",
        paddingTop: 10,
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
        height: 50
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

    dropdown: {
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

    listcontentButtonview: {
        width: 100,
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

    AddHoliday: {
        paddingHorizontal: '5%',
        paddingBottom: '5%'
    },

    AddHolidayButton: {
        width: 135,
        height: 41,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0A62F1',
        alignItems: 'center',
        justifyContent: 'center'
    },

    AddHolidayText: {
        fontWeight: Platform.OS ? '400' : '900',
        fontSize: 16,
        lineHeight: 21.16,
        color: '#0A62F1'
    },


})

export default styles;