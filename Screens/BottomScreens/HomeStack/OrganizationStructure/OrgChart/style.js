import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    Line: {
        left: '-45%',
        top: '20%',
        transform: [{ translateY: -25 }, { rotate: '90deg' }],
        borderWidth: 1,
        borderColor: '#00275C',
        backgroundColor: '#00275C',
        height: 2.5,
        width: "75%"
    },

    Line1: {
        left: '-32%',
        top: '20%',
        transform: [{ translateY: -25 }, { rotate: '90deg' }],
        borderWidth: 1,
        borderColor: '#00275C',
        backgroundColor: '#00275C',
        height: 2,
        width: "20%"
    },

    // Line2: {
    //     left: '-32%',
    //     top: '20%',
    //     transform: [{ translateY: -25 }, { rotate: '90deg' }],
    //     borderWidth: 1,
    //     borderColor: '#00275C',
    //     backgroundColor: '#00275C',
    //     height: 2,
    //     width: "20%"
    // },

    // Line3: {
    //     left: '7.5%',
    //     top: '-22%',
    //     borderWidth: 1.1,
    //     borderColor: '#00275C',
    //     backgroundColor: '#00275C',
    //     height: 2,
    //     width: "10%"
    // },

    // Line4: {
    //     left: '22.9%',
    //     top: '-23%',
    //     borderWidth: 1.1,
    //     borderColor: '#00275C',
    //     backgroundColor: '#00275C',
    //     height: 2,
    //     width: "10%"
    // },

    EmployeeContainer: {
        // marginVertical: "5%",
        width: '100%',
        paddingHorizontal: '5%',
        // backgroundColor:'red'
    },

    Card: {
        backgroundColor: '#00275C',
        width: "60%",
        height: 70,
        borderRadius: 5,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 1,
    },

    Card1: {
        backgroundColor: '#00275C',
        width: 2,
        height: 50,
        zIndex: 1,
    },

    ImgCard: {
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },

    Img: {
        width: 45,
        height: 45,
        borderColor: '#fff',
        borderWidth: 1
    },

    Name: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        marginVertical: '5%'
    },

    Role: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },

})

export default styles;