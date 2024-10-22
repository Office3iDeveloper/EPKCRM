import { StyleSheet } from "react-native";
import { White } from "../../Assets/Colors";

const styles = StyleSheet.create({
    modal: {
        backgroundColor: White,
        borderRadius: 8,
        padding: 20,
        // height: "20%",
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headingmessage: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: "#20DDFE",
        marginRight: 10,
    },
    confirmButton: {
        backgroundColor: "#1772FF",
    },
    pictureButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
    },
    buttonText: {
        color: White,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;