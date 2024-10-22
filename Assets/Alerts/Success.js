import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const LottieAlertSucess = ({ visible, animationSource, title, message }) => {
    return (
        <Modal isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
            <View style={styles.modalBackground1}>
                <View style={styles.modalContainer1}>
                    <LottieView
                        source={animationSource}
                        autoPlay
                        loop={false}
                        style={styles.animationtick}
                    />
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalBackground1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer1: {
        width: "90%",
        // height: 200,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    animationtick: {
        width: 150,
        height: 150,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom:'10%',
    },

    message: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },

});

export default LottieAlertSucess;
