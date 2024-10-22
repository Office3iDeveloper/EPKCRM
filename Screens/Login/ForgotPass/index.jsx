import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import LeftArrowIcon from '../../../Assets/Icons/leftarrow.svg';
import axios from 'axios';
import { White } from "../../../Assets/Colors";
import { useDispatch } from "react-redux";
import LottieAlertSucess from "../../../Assets/Alerts/Success";
import LottieAlertError from "../../../Assets/Alerts/Error";
import LottieCatchError from "../../../Assets/Alerts/Catch";

const ForgotPassword = ({ navigation }) => {

    // useDispatch

    const dispatch = useDispatch();

    // states

    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [employeeIdError, setEmployeeIdError] = useState('');

    // handleSubmit

    const handleSubmit = async () => {

        setLoad(true)

        try {

            if (!email) {
                setEmployeeIdError('Please entered valid mail id');
                setLoad(false)
                return;
            } else {
                setEmployeeIdError('');
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/forgot_password';

            const response = await axios.post(apiUrl, {
                email: email,
            });

            if (response.data.status === "success") {
                setLoad(false);
                // handleShowAlert();
                navigation.navigate('Otp', { Id: email });
            } else {
                setLoad(false);
                // Alert.alert("Login failed");
                handleShowAlert1();
                console.error('Login failed:', response.data.error);
            }

        }

        catch (error) {
            setLoad(false);
            // Alert.alert("Error during Mail", "Check The Login Credentials");
            handleShowAlert2();
            console.error('Error during login:', error);
        }

    }

    const handelGoBack = () => {
        navigation.navigate('Login Screen')
    }

    const handleEmailChange = (text) => {
        setEmail(text);
        dispatch({ type: 'SET_EMAIL', payload: text });
    };

    const [isAlertVisible, setAlertVisible] = useState(false);

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Otp')
        }, 2500);
    };

    const [isAlertVisible1, setAlertVisible1] = useState(false);

    const handleShowAlert1 = (res) => {
        setAlertVisible1(true);
        setTimeout(() => {
            setAlertVisible1(false);
        }, 2500);
    };

    const [isAlertVisible2, setAlertVisible2] = useState(false);

    const handleShowAlert2 = () => {
        setAlertVisible2(true);
        setTimeout(() => {
            setAlertVisible2(false);
        }, 3000);
    };

    return (
        <ImageBackground
            source={require('../../../Assets/Image/MobileBG.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
            resizeMethod="resize"
        >
            <View style={styles.subContainer}>

                <Image source={require('../../../Assets/Image/Forgotpassword.png')} />

                <View style={styles.textView}>
                    <Text style={styles.textTitle}>Forgot Password</Text>
                    <Text style={styles.textContent}>Enter your email and we will send
                        an OTP to reset your password </Text>
                </View>

                <View style={styles.fields}>
                    <TextInput
                        placeholder="Enter your email"
                        style={styles.inputfield}
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                </View>

                <Text style={styles.errorText}>
                    {employeeIdError}
                </Text>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    {
                        load ?
                            <ActivityIndicator size={'small'} color={White} /> :
                            <Text style={styles.submitButtonText}>
                                Submit
                            </Text>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={handelGoBack}>
                    <LeftArrowIcon width={15} height={15} color={White} />
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../../Assets/Alerts/tick.json')}
                title="SuccessFully Logged In"
            />

            <LottieAlertError
                visible={isAlertVisible1}
                animationSource={require('../../../Assets/Alerts/Close.json')}
                title="Failed To Login"
            />

            <LottieCatchError
                visible={isAlertVisible2}
                animationSource={require('../../../Assets/Alerts/Catch.json')}
                title="Please entered valid mail id"
            />

        </ImageBackground>
    )
}

export default ForgotPassword;