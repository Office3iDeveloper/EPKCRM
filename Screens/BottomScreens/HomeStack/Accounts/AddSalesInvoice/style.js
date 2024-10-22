import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

    MDocFileName: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21.28,
        marginTop: '5%',
        borderRadius: 5,
        padding: '3%',
        width: '100%',
        backgroundColor: '#D4E7EB',
    },

    UploadButton1: {
        backgroundColor: '#D4E7EB',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: '100%',
        marginVertical: '5%'
    },

    UploadButtonText1: {
        color: '#3D3D3D',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 17.92
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

    DocFileName: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21.28,
        marginBottom: '5%',
        marginHorizontal: '5%',
        borderRadius: 5,
        padding: '3%',
        width: '90%',
        backgroundColor: '#D4E7EB',
    },

    DocFileNameHolder: {
        width: '90%',
        lineHeight: 21.28,
        fontSize: 14,
        marginBottom: '5%',
    },

    fullWidth: {
        width: '100%',
        paddingHorizontal: '5%'
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
        paddingHorizontal: '5%',
    },

    TimeSlotTouchableText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 19.95,
        color: 'grey',
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

    selectedOption: {
        backgroundColor: '#E1F1FC',
    },

    dropdownOptionText: {
        fontSize: 16,
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
        paddingHorizontal: '5%',
    },

    StatusTouchableText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 19.95,
        color: 'grey',
    },

    buttonview: {
        flexDirection: 'row',
        paddingTop: '10%',
        gap: 20,
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

    Input: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        borderRadius: 7,
        paddingLeft: '5%',
        // paddingLeft:15,
        paddingVertical: '3%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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
        height: 150,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
    },

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
        // width: '100%',
        alignItems: 'center'
    },

    header: {
        flex: 1,
        padding: 10,
        color: "#404040",
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 19.95,
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

    Tablecontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
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
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
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
    Activeindicator: {
        marginTop: '50%'
    },

    StatDateText1: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        marginVertical: '3%',
        width: "90%",
        color: '#2C2C2C',
    },

    StatDateText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        width: "90%",
        color: '#2C2C2C',
    },

    container: {
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
        width: 100,
    },

    DepartmentName: {
        width: 100
    },

    EmployeeName: {
        width: 100
    },

    StartDate: {
        width: 100
    },

    EndDate: {
        width: 100
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

    Multidropdown: {
        borderColor: "#fff",
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        padding: 5,
        backgroundColor: "#fff",
        marginBottom: 10
    },

    Multistyle1: {
        padding: 1,
        margin: 0
    },

    MultiselectedTextStyle: {
        fontSize: 14,
        padding: 0,
        color: "grey",
    },

    selectedays: {
        backgroundColor: '#20DDFE',
        padding: 7,
        borderRadius: 7,
        color: '#fff',
        fontWeight: '400',
    },

    selectedDaysContainer: {
        flexDirection: 'row',
        gap: 5,
        flexWrap: 'wrap',
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

    HeaderButtonText: {
        color: '#0A60F1',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.62
    },
})

export default styles;