import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Splashcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    SplashimageContainer: {
        width: '75%',
        aspectRatio: 1,
        backgroundColor: "transparent",
        padding: 10,
    },
    Splashimage: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
});

export default styles;