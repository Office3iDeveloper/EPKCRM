import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    BeforeContainer: {
        marginHorizontal: '5%',
        marginTop: '5%'
    },

    dateChanger: {
        margin: "5%",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    DonetContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
    },

    mentions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },

    gpay: {
        width: 20,
        height: 20,
        backgroundColor: '#0A63F2',
        borderRadius: 3
    },

    npay: {
        width: 20,
        height: 20,
        backgroundColor: '#F20A8C',
        borderRadius: 3
    },

    deduc: {
        width: 20,
        height: 20,
        backgroundColor: '#3B609D',
        borderRadius: 3
    },

    countboxview: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    countbox: {
        backgroundColor: '#fff',
        height: 87,
        borderRadius: 8,
        width: "45%",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },

    head: {
        color: '#00275C',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center'
    },

    val: {
        color: '#00275C',
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center'
    },

    topic: {
        color: '#00275C',
        fontWeight: '700',
        fontSize: 20,
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

})

export default styles;