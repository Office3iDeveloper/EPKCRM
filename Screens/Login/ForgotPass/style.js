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
        paddingBottom: "2%",
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    fields: {
        paddingTop: "5%",
        width: "100%",
    },
    inputfield: {
        borderRadius: 5,
        backgroundColor: '#E1F5FF',
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#FCFCFC'
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
    textView: {
        alignItems: 'center',
        width: '80%',
        gap: 10
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 29.05,
        color: White
    },
    textContent: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16.94,
        color: White,
        textAlign: 'center'
    },
    backButton: {
        paddingTop: '15%',
        flexDirection: 'row',
        gap: 5,
    },
    backButtonText: {
        color: White,
    },
    errorText:{
        paddingTop:'2%',
        color:'red'
    }
});

export default styles;