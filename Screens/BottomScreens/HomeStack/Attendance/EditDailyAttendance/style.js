import { StyleSheet } from "react-native";

const styles = StyleSheet.create({


    modalContent1: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
        width: '80%',
        gap:10
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
        height: 100,
        width: 400
    },

    row: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderBottomWidth: 0.5,
    },

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
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

    cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
    },

    sno: {
        width: 100,
    },

    DepartmentName: {
        width: 150
    },

    EmployeeName: {
        width: 150
    },

    Status: {
        width: 150
    },

    Action: {
        width: 150
    },

    listcontentButtonview: {
        width: 150,
        paddingLeft: "5%",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
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

    listBody: {
        paddingVertical: '1%'
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
    StatusText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        paddingTop: "3%",
        width: "90%",
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
        color: '#000',
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
    // listContainer: {
    //     backgroundColor: "#fff",
    //     borderRadius: 11,
    //     borderWidth: 1,
    //     borderColor: '#A4CED8',
    //     width: "90%",
    // },
    // listHeader: {
    //     backgroundColor: '#E1F1FC',
    //     borderTopLeftRadius: 11,
    //     borderTopRightRadius: 11,
    //     flexDirection: 'row',
    //     width: '100%',
    //     height: 44,
    //     alignItems: 'center'
    // },
    // sno: {
    //     width: '15%',
    //     paddingLeft: "3%",
    //     color: "#404040",
    //     fontWeight: '600',
    //     fontSize: 15,
    //     lineHeight: 19.95
    // },
    // shift: {
    //     width: '30%',
    //     paddingLeft: "3%",
    //     color: "#404040",
    //     fontWeight: '600',
    //     fontSize: 15,
    //     lineHeight: 19.95
    // },
    // status: {
    //     width: '30%',
    //     paddingLeft: "2%",
    //     color: "#404040",
    //     fontWeight: '600',
    //     fontSize: 15,
    //     lineHeight: 19.95
    // },
    // Action: {
    //     width: '25%',
    //     paddingLeft: "7%",
    //     color: "#404040",
    //     fontWeight: '600',
    //     fontSize: 15,
    //     lineHeight: 19.95
    // },
    // listcontent: {
    //     flexDirection: 'row',
    //     paddingTop: 10,
    //     paddingBottom: 10
    // },
    // listcontentsno: {
    //     width: '15%',
    //     paddingLeft: "5%"
    // },
    // listcontentShift: {
    //     width: '30%',
    //     paddingLeft: "3%"
    // },
    // listcontentstatus: {
    //     width: '30%',
    //     paddingLeft: "3%"
    // },
    // listcontentButtonview: {
    //     width: '25%',
    //     paddingLeft: "5%",
    //     flexDirection: 'row',
    //     gap: 10
    // },
    // listcontenteditbutton: {
    //     width: 26,
    //     height: 26,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: "#76B700",
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: '#F0F6E5'
    // },
    // listcontentdelbutton: {
    //     width: 26,
    //     height: 26,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: "#FF7676",
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: '#FFE0E0'
    // },
    errorText: {
        color: "red",
        paddingTop: 10,
        width: "90%"
    },
    errorTextDelete: {
        color: "red",
        paddingBottom: 10,
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
    Activeindicator: {
        // height: 100,
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#515151',
        marginVertical: '5%',
        width: '90%',
        height: 50,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
    },
})

export default styles;