import { Platform, StyleSheet } from "react-native";


const styles = StyleSheet.create({

    // dropdownButton:{
    //     padding:100,
    //     backgroundColor:'red'
    // },

    filterInput: {
        borderWidth: 1,
        borderColor: "#1AD0FF",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === "ios" ? 15 : 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        margin: '5%',
        backgroundColor: '#fff'
    },

    search: {
        width: "90%",
    },

    searchIcon: {
        width: 24,
        height: 24,
        // marginTop: '3%',
    },

    Page: {
        width: '100%',
        paddingTop: '5%'
    },

    ButtonView: {
        marginHorizontal: '5%',
        marginTop: '3%',
        flexDirection: 'row',
        gap: 20
    },

    ButtonView1: {
        marginHorizontal: '5%',
        marginTop: '3%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#0A62F1',
        borderRadius: 6,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },

    Button: {
        backgroundColor: '#DBE9FF',
        width: '25%',
        height: 45,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Button1: {
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1.5,
        borderColor: '#0A62F1',
        flexDirection: 'row',
        gap: 5
    },

    Button2: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5
    },

    ButtonText: {
        color: '#0A62F1',
        fontWeight: '400',
        fontSize: 15,
    },

    ButtonText1: {
        color: '#0A62F1',
        fontWeight: '400',
        fontSize: 15,
    },

    ButtonText2: {
        color: '#BD0000',
        fontWeight: '400',
        fontSize: 15
    },

    ButtonCount: {
        backgroundColor: '#0A62F1',
        color: '#fff',
        borderRadius: 5,
        paddingHorizontal: 8,
        marginLeft: 5
    },

    ButtonCountText: {
        color: '#fff',
        fontWeight: '500',
        textAlign:'center'
    },

    Tablecontainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        width: "90%",
        marginHorizontal: 20,
        marginTop: '3%'
    },

    Activeindicator: {
        height: 150,
        width: 400
    },

    row: {
        flexDirection: 'row',
        borderColor: '#ccc',
    },

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
        alignItems: 'center'
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

    EmployeeName: {
        width: 120
    },

    StartDate: {
        width: 170
    },

    EndDate: {
        width: 170
    },

    Resume: {
        width: 120
    },

    Action: {
        width: 120
    },

    listBody: {
        paddingVertical: '1%',
        borderBottomWidth: 0.5,
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

    listcontentButtonview: {
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10
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

    listcontentmailbutton: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#0A62F1",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DBE9FF',
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

    modalTextHeading1: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        color: "#000",
        paddingVertical: '3%',
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

    Reason: {
        marginBottom: "5%",
        borderRadius: 5,
        borderColor: '#515151',
        borderWidth: 1,
        paddingLeft: 20,
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
})

export default styles;