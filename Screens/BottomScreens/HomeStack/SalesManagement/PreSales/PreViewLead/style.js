import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    HeaderButtonActive: {
        width: '25%',
        height: 42,
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

    PolicyContainer: {
        alignItems: 'center',
        paddingBottom: '5%'
    },

    PolicyContainerTitleHeader: {
        paddingVertical: '5%',
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

    CardContainer: {
        width: '90%',
        backgroundColor: '#F4FDFF',
        paddingHorizontal: '10%',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#A4CED8',
        marginTop: '10%'
    },

    CardContainerTitle: {
        paddingVertical: '5%',
        borderBottomWidth: 1,
        borderColor: '#A4CED8'
    },

    CardContainerList: {
        paddingVertical: '5%',
        fontWeight: '600',
        fontSize: 16,
        color: '#2C2C2C'
    },

    CardContainerListData: {
        fontWeight: '400'
    },

    View: {
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7E0FC',
        borderRadius: 7,
        flexDirection: 'row',
        gap: 5
    },

    inputs: {
        borderWidth: 1,
        borderColor: '#515151',
        height: 52,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
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
        marginTop: '5%'
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

    listHeader: {
        backgroundColor: '#E1F1FC',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        flexDirection: 'row',
        alignItems: 'center'
    },

    sno: {
        width: 80,
    },

    DepartmentName: {
        width: 100
    },

    StartDate: {
        width: 120
    },

    EndDate: {
        width: 120
    },

    listBody: {
        paddingVertical: '1%',
        borderBottomWidth: 0.5,
    },


})

export default styles;