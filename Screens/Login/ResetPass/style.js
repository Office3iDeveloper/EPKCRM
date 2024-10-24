import { StyleSheet } from "react-native";
import { SubContainer, White } from "../../../Assets/Colors";

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        backgroundColor: '#FBB5BB4D',
        width: "80%",
        alignItems: 'center',
        borderRadius: 20,
        paddingTop: "10%",
        paddingBottom: "10%",
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    textView: {
        alignItems: 'center',
        width: '80%',
        gap: 10
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 29.05,
        color: White,
        paddingTop: "10%",
    },
    fields: {
        paddingTop: "10%",
        gap: 5,
        width: "100%",
    },
    inputfield: {
        borderRadius: 5,
        backgroundColor: '#E1F5FF',
        paddingLeft: 15,
    },
    submitButton: {
        backgroundColor: "#ed1c26",
        width: "50%",
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: '7%'
    },
    submitButtonText: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 19.36,
        color: White,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E1F5FF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FCFCFC',
    },
    iconsContainer: {
        paddingRight: "5%"
    }
});

export default styles;