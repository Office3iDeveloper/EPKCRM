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
        backgroundColor: SubContainer,
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
        gap: 15
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 29.05,
        color: White,
        paddingTop: '10%',
    },
    textContent: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16.94,
        color: White,
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: "#1772FF",
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
    otpContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: "10%"
    },
    input: {
        width: "20%",
        borderColor: '#FCFCFC',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#E1F5FF'
    },
    errorText:{
        paddingTop:'2%',
        color:'red'
    }
});

export default styles;