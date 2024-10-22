import { StyleSheet } from "react-native";

const styles = StyleSheet.create({



    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    },

    topcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        width: '90%',
        marginTop: "10%",
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 2,
    },

    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },

    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: "5%",
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
    },

    datetime: {
        fontSize: 16,
        lineHeight: 21.28,
        fontWeight: '600',
        color: "#000",
    },

    button: {
        borderRadius: 140,
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "5%",
        elevation: 8,
    },

    buttontext: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginTop: "5%"
    },

    clockcontainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20
    },

    clockCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '33.3%',
        padding: 2,
    },

    timetext: {
        fontWeight: '400',
        color: "#000",
        fontSize: 14,
        paddingTop: "5%",
        lineHeight: 18.62,
        paddingBottom: "5%",
    },

    timenumbertext: {
        fontWeight: '500',
        color: "#000",
        fontSize: 16
    },

    CountContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },

    cardContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: "1%",
    },

    CountContainerWidth: {
        width: '49%'
    },

    counterCards: {
        borderRadius: 5,
        marginTop: "1%",
        gap: 5,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: "center",
        elevation: 5,
        height: 78
    },

    fontStyle: {
        fontWeight: '400',
        fontSize:16
    },

    numbers: {
        fontWeight: '700',
        fontSize: 24,
        color: "#000",
        lineHeight: 31.92,
    },

    EmployeeModeBoard: {
        width: "90%",
        paddingTop: "5%",
        paddingBottom: "5%",
        borderRadius: 19,
        backgroundColor: '#F4FDFF',
        alignItems: 'center',
    },

    EmployeeModeBoardContainer: {
        paddingTop: "5%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: "5%",
    },

    EmployeeModeBoardTitle: {
        color: '#00275C',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 23.94,
    },

    border: {
        borderBottomColor: "#A2CCD6",
        borderBottomWidth: 1,
        width: "80%",
        paddingTop: "5%",
    },

    textview: {
        alignItems: 'flex-start',
        // width: "65%",
    },

    text: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18.62,
        color: "#000",
        paddingTop: "5%",
    },

    Emo: {
        flexDirection: 'row',
        // paddingTop: "5%",
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: "65%",
    },

    buttonContainer: {
        flexDirection: 'row',
        paddingTop: "5%",
    },

    buttonSubmit: {
        backgroundColor: "#1772FF",
        width: 94,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },

    buttonCancel: {
        backgroundColor: '#F4FDFF',
        width: 94,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },

    EmployeeModeBoardbuttonSubmitText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 16.94,
    },

    EmployeeModeBoardbuttonCancelText: {
        color: '#1772FF',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16.94,
    },

    EmployeeModeBoardListContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: "5%",
    },

    EmployeeListModeBoard: {
        width: "90%",
        paddingVertical: '5%',
        borderRadius: 19,
        backgroundColor: '#F4FDFF',
        alignItems: 'center',
    },

    EmoCheck: {
        flexDirection: 'row',
        paddingTop: "5%",
        // paddingHorizontal: '5%',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },

    MoodBoardText: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 19.95,
    },

    EmoCheckList: {
        paddingTop: '5%',
        flexDirection: 'row',
        width: '75%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    viewMore: {
        color: '#0A60F1',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 21.28,
    },

    viewMoreContainer: {
        paddingTop: '5%',
        alignItems: 'center'
    },

    AnnounceMentContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingBottom: "5%",
    },

    AnnounceMent: {
        // width: "90%",
        marginHorizontal: '5%',
        paddingTop: "5%",
        paddingBottom: "5%",
        borderRadius: 19,
        backgroundColor: '#F4FDFF',
        alignItems: 'center',
    },

    tittle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%'
    },

    tittleText: {
        color: '#00275C',
        lineHeight: 21.28,
        fontSize: 16,
        fontWeight: '700',
    },

    addbutton: {
        borderColor: '#0A60F1',
        borderWidth: 2,
        borderRadius: 5,
        width: 72,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addbuttonText: {
        color: '#000',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18.62,
    },

    emojiButton: {
        padding: 5,
        borderRadius: 20,
        margin: 5,
    },

    selectedEmoji: {
        backgroundColor: '#D0F6FF',
    },

    option: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },

    selectedOption: {
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
    },

    AnnouncementData: {
        backgroundColor: '#E1F3F8',
        marginHorizontal: '7%',
        paddingTop: '5%',
        borderRadius: 7,
        marginTop: '5%'
    },

    AnnouncementDataHeadr: {
        paddingHorizontal: '5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    AnnouncementDataHeadrTitle: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 18.62,
        width: '55%',
        // backgroundColor:'red',
    },

    AnnouncementDataHeadrWhen: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 19.95,
        width: '35%',
        // backgroundColor:'red',
        textAlign:'right'
    },

    ModalerrorText: {
        color: "red",
        paddingTop: 10,
    },

    errorText: {
        color: "red",
        paddingBottom: '5%',
        width: "90%"
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
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        marginVertical: '5%'
    },

    modalInput1: {
        paddingLeft: 20,
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor: "#515151",
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        marginVertical: '5%'
    },

    inputs: {
        borderWidth: 0.5,
        borderColor: '#515151',
        marginVertical: '5%',
        // width: '90%',
        height: 50,
        borderRadius: 7,
        paddingHorizontal: '5%',
        marginBottom: '3%',
        justifyContent: 'center',
    },

    modalLabelText: {
        paddingTop: '5%',
        paddingBottom: '5%'
    },

    Activeindicator: {
        height: 100,
    }
});

export default styles;

