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

    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%"
    },

    Container: {
        // marginTop: '10%'
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
        // width: '50%',
    },

    PolicyContainer: {
        alignItems: 'center',
    },

    PolicyContainerTitleHeader: {
        paddingTop: "5%",
        paddingBottom: "5%",
        width: "90%",
    },

    PolicyContainerTitleText: {
        color: '#00275C',
        fontWeight: '700',
        lineHeight: 23.94,
        fontSize: 18,
    },

})

export default styles;