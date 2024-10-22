import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    errorTextDelete: {
        color: "red",
        paddingBottom: 10,
        width: "90%"
    },

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
        width: 100
    },

    EmployeeName: {
        width: 120
    },

    StartDate: {
        width: 200
    },

    listBody: {
        paddingVertical: '1%',
        borderBottomWidth: 0.5,
    },

    modaldropdown: {
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
        color: 'grey',
    },

    Activeindicator: {
        height: 100,
        width: 400
    },

    RoleName: {
        width: 100,
        color: "#404040",
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 19.95,
        textAlign: 'center'
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

    MDocFileName: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21.28,
        marginBottom: '5%',
        borderRadius: 5,
        padding: '3%',
        // backgroundColor: '#D4E7EB',
    },

    MDocFileNameHolder: {
        lineHeight: 21.28,
        fontSize: 14,
        marginBottom: '5%',
    },

    MfullWidth: {
        width: '100%',
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

    ShiftSlotContainer: {
        alignItems: 'center',
        paddingBottom: '5%'
    },

    ShiftSlotContainerTitle: {
        paddingTop: "5%",
        paddingBottom: "5%",
        width: "90%",
    },

    ShiftSlotContainerTitleText: {
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
        height: 42,
        backgroundColor: '#F3FCFF',
        borderWidth: 1,
        borderColor: '#515151',
        borderRadius: 7,
        paddingLeft: 15
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

    listContainer: {
        backgroundColor: "#fff",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
    },

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        alignItems: 'center'
    },

    // sno: {
    //     width: 100,
    //     textAlign: 'center',
    //     color: "#404040",
    //     fontWeight: '600',
    //     fontSize: 15,
    //     lineHeight: 19.95
    // },

    Action: {
        width: 100,
        textAlign: 'center',
        color: "#404040",
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 19.95
    },

    listcontent: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },

    listcontentsno: {
        width: 100,
        textAlign: 'center'
    },

    listcontentRoleName: {
        width: 100,
        textAlign: 'center'
    },

    listcontentStatus: {
        width: 100,
        textAlign: 'center'
    },

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

    listcontentdownloadbutton: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#0073BE",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0F1FC'
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

    errorText: {
        color: "red",
        paddingTop: 10,
        width: "90%"
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
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: '10%'
    },
    Mbuttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: '20%'
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
        height:50
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
})

export default styles;