import { StyleSheet } from "react-native";
import { SecondaryBlue, SubContainer, White, black } from "../../../Assets/Colors";


const styles = StyleSheet.create({
    SplashimageContainer: {
        width: '90%',
        aspectRatio: 1,
        backgroundColor: "transparent",
        // padding: 10,
    },
    Splashimage: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subContainer: {
        backgroundColor: SubContainer,
        width: "80%",
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical:'10%',
        paddingHorizontal: '5%'
    },
    LogoContainer: {
        width: "50%",
        height: 72,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    LogoText: {
        color: black,
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19.36,
    },
    fields: {
        paddingTop: "15%",
        gap: 5,
        width: "100%",
    },
    inputfield: {
        borderRadius: 5,
        backgroundColor: '#E1F5FF',
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#FCFCFC',
        height:50,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E1F5FF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FCFCFC',
    },
    ForgotPassword: {
        paddingTop:'2%',
        width: "100%",
        alignItems: 'flex-end'
    },
    ForgotPasswordText: {
        fontWeight: '500',
        fontSize: 13,
        color: White,
    },
    loginView: {
        paddingTop: "5%",
        width: "100%",
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: "#1772FF",
        width: "50%",
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    loginButtonText: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 19.36,
        color: White,
    },
    powerby: {
        paddingTop: "10%"
    },
    powerbyText: {
        fontWeight: '800',
        color: White,
    },
    powerdebyContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingTop: '3%'
    },
    powerdebyContentIcon: {
        width: 39,
        height: 24,
        borderWidth: 3,
        borderRadius: 2,
        borderColor: '#810084'
    },
    powerdebyContentName: {
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 16.94
    },
    endContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "60%",
        paddingBottom: "5%"
    },
    endContainerText: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14.52,
        color: White
    },
    inputfieldpass: {
        paddingLeft: 15,
        width: "90%",
        height:50,
    },
    errorText: {
        color: "red",
        paddingVertical: '3%',
        width: "90%",
    },
    errorText1: {
        color: "red",
        // paddingVertical: '3%',
        width: "90%",
    },
});

export default styles;