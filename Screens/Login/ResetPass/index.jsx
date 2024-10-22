import React, { useState } from "react";
import styles from "./style";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import EyeOpenIcon from '../../../Assets/Icons/eyeopen.svg';
import EyeCloseIcon from '../../../Assets/Icons/EyeClose.svg';
import { White } from "../../../Assets/Colors";
import axios from "axios";
import { useSelector } from "react-redux";
import LottieAlertSucess from "../../../Assets/Alerts/Success";
import LottieAlertError from "../../../Assets/Alerts/Error";
import LottieCatchError from "../../../Assets/Alerts/Catch";

const ResetPassword = ({ navigation }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showEmployeeId, setShowEmployeeId] = useState(false);
    const [employeeIdError, setEmployeeIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [EmployeeId, setEmployeeId] = useState('');
    const [Password, setPassword] = useState('');
    const [load, setLoad] = useState(false);

    const { email } = useSelector((state) => state.login)

    const handleReset = async () => {

        setLoad(true)

        try {

            if (!EmployeeId) {
                setEmployeeIdError('Password is required');
                setLoad(false)
                return;
            } else {
                setEmployeeIdError('');
            }

            if (!Password) {
                setPasswordError('Confirm Password is required');
                setLoad(false)
                return;
            } else {
                setPasswordError('');
            }

            if (EmployeeId !== Password) {
                Alert.alert("Passwords do not match");
                setLoad(false);
                return;
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/forgot_change_password';

            const response = await axios.post(apiUrl, {
                email: email,
                change_password: EmployeeId,
            });

            if (response.data.status === "success") {
                setLoad(false);
                handleShowAlert();
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

    const [isAlertVisible, setAlertVisible] = useState(false);
    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
            navigation.navigate('Login Screen');
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
                <Image source={require('../../../Assets/Image/ResetPassword.png')} />

                <View style={styles.textView}>
                    <Text style={styles.textTitle}>Reset Password</Text>
                </View>

                <View style={styles.fields}>

                    <View style={styles.inputContainer}>

                        <TextInput
                            placeholder="Enter new password"
                            style={styles.inputfield}
                            value={EmployeeId}
                            secureTextEntry={!showEmployeeId}
                            onChangeText={(text) => setEmployeeId(text)}
                        />

                        <TouchableOpacity
                            style={styles.iconsContainer}
                            onPress={() => setShowEmployeeId(!showEmployeeId)}
                        >
                            {showEmployeeId ? <EyeOpenIcon color="black" /> : <EyeCloseIcon color="black" />}
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.errorText}>
                        {employeeIdError}
                    </Text>

                    <View style={styles.inputContainer}>

                        <TextInput
                            placeholder="Confirm new password"
                            style={styles.inputfield}
                            secureTextEntry={!passwordVisible}
                            value={Password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            style={styles.iconsContainer}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <EyeOpenIcon color="black" /> : <EyeCloseIcon color="black" />}
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.errorText}>
                        {passwordError}
                    </Text>

                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleReset}>
                    {
                        load ?
                            <ActivityIndicator size={'small'} color={White} /> :
                            <Text style={styles.submitButtonText}>
                                Reset Password
                            </Text>
                    }
                </TouchableOpacity>

            </View>

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../../Assets/Alerts/tick.json')}
                title="SuccessFull"
            />

            <LottieAlertError
                visible={isAlertVisible1}
                animationSource={require('../../../Assets/Alerts/Close.json')}
                title="Failed"
            />

            <LottieCatchError
                visible={isAlertVisible2}
                animationSource={require('../../../Assets/Alerts/Catch.json')}
                title="Error While Fetching Data Check Login Credential"
            />

        </ImageBackground>
    )
}

export default ResetPassword;