import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, Linking, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import EyeOpenIcon from '../../../Assets/Icons/eyeopen.svg';
import EyeCloseIcon from '../../../Assets/Icons/EyeClose.svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { White } from "../../../Assets/Colors";
import LottieAlertSucess from "../../../Assets/Alerts/Success";
import LottieAlertError from "../../../Assets/Alerts/Error";
import LottieCatchError from "../../../Assets/Alerts/Catch";

const LoginScreen = ({ navigation }) => {

    // 

    const handleForgotPassword = () => {
        navigation.navigate('Forgot Password');
    };

    // dispatch

    const dispatch = useDispatch();

    // states

    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [employeeIdError, setEmployeeIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [load, setLoad] = useState(false);

    // handle login

    const handleLogin = async () => {

        setLoad(true)

        try {

            if (!employeeId) {
                setEmployeeIdError('Employee ID is required');
                setLoad(false)
                return;
            } else {
                setEmployeeIdError('');
            }

            if (!password) {
                setPasswordError('Password is required');
                setLoad(false)
                return;
            } else {
                setPasswordError('');
            }

            const apiUrl = 'https://office3i.com/development/api/public/api/login';

            const response = await axios.post(apiUrl, {
                user_login: employeeId,
                password: password
            });

            if (response && response.data) {

                setLoad(false);

                const data = response.data;
                const val = {
                    token: data.token,
                    tokenId: data.token_user_id,
                    usercheckincurrentdate: data.usercheckincurrentdate,
                    userdepartment: data.userdepartment,
                    userdepartmentname: data.userdepartmentname,
                    useremail: data.useremail,
                    userempcheckintime: data.userempcheckintime,
                    userempcheckouttime: data.userempcheckouttime,
                    userempchecktotaltime: data.userempchecktotaltime,
                    userempid: data.userempid,
                    userepkempid: data.userepkempid,
                    userimage: data.userimage,
                    userlogin: data.userlogin,
                    usermobile: data.usermobile,
                    username: data.username,
                    userrole: data.userrole,
                    supervisor: data.supervisor,
                    user_loginid: data.user_loginid,
                };

                const mail = {
                    useremail: data.useremail,
                }

                // Convert val to a string before storing it in localStorage

                const valString = JSON.stringify(val);
                const mailString = JSON.stringify(mail);

                // Set the stringified val in localStorage

                AsyncStorage.setItem('userData', valString);
                dispatch({ type: 'SET_USER_DATA', payload: val })

                AsyncStorage.setItem('userMail', mailString);
                dispatch({ type: 'SET_EMAIL', payload: mail })

                Alert.alert("Succesfull", "Successfully Logged In")

            } else {
                setLoad(false);
                handleShowAlert1();
                console.error('Login failed:', response.data.error);
            }
        } catch (error) {
            setLoad(false);
            handleShowAlert2();
            console.error('Error during login:', error);
        }
    };

    const [isAlertVisible, setAlertVisible] = useState(false);

    const handleShowAlert = (data) => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
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
            <View>
            </View>

            <View style={styles.subContainer}>
                <View style={styles.LogoContainer}>
                    {/* <Text style={styles.LogoText}>Logo</Text> */}
                    <View style={styles.SplashimageContainer}>
                        <Image
                            source={require('../../../Assets/Image/HREntityLogo.jpg')}
                            style={styles.Splashimage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View style={styles.fields}>

                    <TextInput
                        placeholder="Email ID"
                        style={styles.inputfield}
                        value={employeeId}
                        onChangeText={(text) => setEmployeeId(text)}
                    />

                    <Text style={styles.errorText}>
                        {employeeIdError}
                    </Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Password"
                            style={styles.inputfieldpass}
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={(text) => setPassword(text)} />


                        <TouchableOpacity
                            style={styles.iconsContainer}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <EyeOpenIcon color="black" /> : <EyeCloseIcon color="black" />}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.ForgotPassword} onPress={handleForgotPassword}>
                        <Text style={styles.ForgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Text style={styles.errorText1}>
                        {passwordError}
                    </Text>

                </View>

                <View style={styles.loginView}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        {
                            load ?
                                <ActivityIndicator size={'small'} color={White} /> :
                                <Text style={styles.loginButtonText}>Log In</Text>
                        }
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.endContainer}>

                <TouchableOpacity>
                    <Text style={styles.endContainerText}>Cookie Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('http://office3i.com/termsandcondition')} style={{}}>
                    <Text style={styles.endContainerText}>Terms & Conditons</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.endContainerText}>Privacy Policy</Text>
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
                title="Error While Fetching Data Check Login Credential"
            />

        </ImageBackground>



    )
}

export default LoginScreen;
