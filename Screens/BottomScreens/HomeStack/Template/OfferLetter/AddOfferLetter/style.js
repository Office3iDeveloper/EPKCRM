import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

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

    fullWidth: {
        width: '100%',
        paddingHorizontal: '5%'
    },

    DocFileName: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21.28,
        marginBottom: '5%',
        // marginHorizontal: '5%',
        borderRadius: 5,
        padding: '3%',
        // width: '90%',
        backgroundColor: '#D4E7EB',
    },

    DocFileNameHolder: {
        // width: '90%',
        lineHeight: 21.28,
        fontSize: 14,
        marginBottom: '5%',
    },

    UploadButton: {
        backgroundColor: '#D4E7EB',
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // marginHorizontal: '5%',
    },

    UploadButtonText: {
        color: '#3D3D3D',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 17.92
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

    StatDateText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        width: "90%",
        color: '#2C2C2C',
    },

    inputs1:{
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        height: 152,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
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

    HeaderButtonActive: {
        width: '35%',
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

})

export default styles;