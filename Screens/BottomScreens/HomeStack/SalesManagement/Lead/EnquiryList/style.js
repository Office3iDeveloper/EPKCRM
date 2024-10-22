import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    listcontentButtonview: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
    },

    listcontentviewbutton: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#8056FF",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7E0FC'
    },
    
    box: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },

    top: {
        marginHorizontal: '10%'
    },

    Agenta: {
        paddingVertical: '3%',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 23.94,
    },

    AgentaView: {
        flexDirection: 'row',
        paddingBottom: '5%',
        justifyContent: 'flex-end',
        paddingHorizontal: '5%',
        marginHorizontal: '5%'
    },

    Container: {
        marginTop: '10%'
    },

    inputs: {
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: '40%',
        height: 42,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
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
        paddingVertical: '1%',
        borderBottomWidth: 0.5,
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
        width: 200
    },

    box: {
        width: 100,
    },

    EmployeeName: {
        width: 200
    },

    StartDate: {
        width: 120
    },

    EndDate: {
        width: 120
    },

    ShiftSlot: {
        width: 100
    },

    WeekOff: {
        width: 100
    },

    Status: {
        width: 100
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

    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '5%',
    },

    pageNo: {
        fontWeight: '700',
        fontSize: 14,
        marginHorizontal: 5,
        padding: 5,
        fontSize: 16,
    },

    PageActive: {
        width: 40,
        height: 40,
        backgroundColor: '#0A62F1',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 40,
        overflow: 'hidden',
    },
})

export default styles;