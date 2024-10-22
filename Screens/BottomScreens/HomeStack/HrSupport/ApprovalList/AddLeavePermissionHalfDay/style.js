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

    errorText: {
        color: "red",
        paddingTop: 10,
        width: "90%"
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

    TimeSlotTouchableText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 19.95,
        color: 'grey',
    },

    TimeSlotTouchable: {
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

    TimeSlotText: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 21.28,
        paddingBottom: "3%",
        paddingTop: "3%",
        width: "90%",
    },

    inputs: {
        borderWidth: 1,
        borderColor: '#515151',
        width: '90%',
        height: 50,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
    },

    Reason: {
        height: 118,
        width: "90%",
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

    InputContainer: {
        backgroundColor: '#F4FDFF',
        width: '90%',
        borderWidth: 1,
        borderRadius: 11,
        borderColor: '#A4CED8',
        padding: '5%',
        marginVertical: '10%',
        marginHorizontal: '5%',
        alignItems: 'center',
    },

    subHeading: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21.28,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        width: '100%',
    },

    fullWidth: {
        width: '100%',
        paddingHorizontal: '5%'
    },

    Row: {
        flexDirection: 'row',
        paddingVertical: '5%',
    },

    Left: {
        justifyContent: 'space-around'
    },

    NextButton: {
        width: 100,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#0A62F1',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '10%',
        flexDirection: 'row',
    },

    NextButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 21.28
    },

    PrevButton: {
        width: 100,
        height: 40,
        borderRadius: 5,
        borderColor: '#0A62F1',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '10%',
        flexDirection: 'row',
    },

    PrevButtonText: {
        color: '#0A62F1',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 21.28
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
})

export default styles;