import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({

    profileview: {
        flexDirection: 'row',
        backgroundColor: Platform.OS === "ios" ? null : "#1FDAFD",
        padding: 10,
        // paddingTop: 50,
        alignItems: 'center'
    },

    profileviewusername: {
        fontSize: 18,
        fontWeight: 'bold',
        width: "90%",
        paddingVertical: '1%'
    },

    profileviewuserdepartmentname: {
        fontSize: 14,
        fontWeight: '500'
    },

    imageview: {
        // marginRight: 16,
        width: '30%'
    },

    imageStyle: {
        width: 70,
        height: 70,
        borderRadius: 70,
        borderWidth: 0.5,
    },

    dropdown: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 3,
        height: 58,
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        shadowRadius: 2,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },

    dropdownText: {
        fontSize: 16,
        fontWeight: '400',
        // backgroundColor:'red',
        width: 150
    },

    forSingle: {
        height: 48,
        justifyContent: 'center',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        shadowRadius: 2,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },

    forSingle1: {
        height: 58,
        justifyContent: 'center',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        shadowRadius: 2,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },

    forsinglelable1: {
        fontSize: 16,
        fontWeight: '400',
    },

    forsinglelable: {
        fontSize: 16,
        fontWeight: '600',
    },

    Tab: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        height: 50
    },

    shadowContainer: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        // shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 5, // For Android
        // marginTop:50
    },

    DrawerContentScrollView: {
        // marginTop: -6,
    }

});

export default styles;