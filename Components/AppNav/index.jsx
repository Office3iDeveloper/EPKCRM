import React, { useEffect, useState } from "react";
import LoginScreen from "../../Screens/Login/LoginScreen";
import AppNavigator from "../../Screens/DrawerNavigation";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../Screens/SplashScreen/index.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../../Screens/Login/ForgotPass/index.jsx";
import ResetPassword from "../../Screens/Login/ResetPass/index.jsx";
import Otp from "../../Screens/Login/OtpScreen/index.jsx";
import { Alert } from "react-native";
import LottieAlertSucess from "../../Assets/Alerts/Success";
import axios from "axios";

const Stack = createNativeStackNavigator();

const AppNav = ({ navigation }) => {

    // state 

    const [loading, setLoading] = useState(true);

    // dispatch

    const dispatch = useDispatch();

    // data from redux store

    const { data } = useSelector((state) => state.login)

    // Api call

    useEffect(() => {

        const fetchData = async () => {
            try {
                const valString = await AsyncStorage.getItem('userData');
                const mailString = await AsyncStorage.getItem('userMail');
                const val = JSON.parse(valString);
                const mail = JSON.parse(mailString);
                setLoading(false);
                dispatch({ type: 'SET_USER_DATA', payload: val });
                dispatch({ type: 'SET_EMAIL', payload: mail });
            } catch (error) {
                setLoading(false);
                console.error('Error retrieving data from storage:', error);
            }
        };

        fetchData();
    }, []);

    // const fetchData = async () => {
    //     try {
    //         const valString = await AsyncStorage.getItem('userData');
    //         const mailString = await AsyncStorage.getItem('userMail');
    //         const val = JSON.parse(valString);
    //         const mail = JSON.parse(mailString);

    //         // Ensure loading is set to false after fetching
    //         setLoading(false);

    //         if (val) {
    //             dispatch({ type: 'SET_USER_DATA', payload: val });
    //         } else {
    //             dispatch({ type: 'REMOVE_USER_DATA', payload: {} });
    //         }

    //         if (mail) {
    //             dispatch({ type: 'SET_EMAIL', payload: mail });
    //         }

    //     } catch (error) {
    //         setLoading(false);
    //         console.error('Error retrieving data from storage:', error);
    //     }
    // };

    // const SessionApi = async () => {

    //     try {

    //         const apiUrl = `https://office3i.com/development/api/public/api/auth_valid_checking`;

    //         const slicedToken = data.token.split('|')[1];
    //         console.log(slicedToken, "slice");

    //         const response = await axios.post(apiUrl, {
    //             login_id: data.tokenId,
    //             token: slicedToken,
    //         });

    //         const responsedata = await response.data;
    //         console.log(responsedata, "Active-Seesion");

    //         if (responsedata.status === "success") {
    //             fetchData();
    //         } else {
    //             Alert.alert('Failed', responsedata.message);
    //             await AsyncStorage.removeItem('userData');
    //             const val = {};
    //             dispatch({ type: 'REMOVE_USER_DATA', payload: val });
    //         }

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }

    // };

    // const SessionApi = async () => {
    //     try {
    //         const apiUrl = `https://office3i.com/development/api/public/api/auth_valid_checking`;
    //         const slicedToken = data.token.split('|')[1];

    //         const response = await axios.post(apiUrl, {
    //             login_id: data.tokenId,
    //             token: slicedToken,
    //         });

    //         const responsedata = response.data;
    //         console.log(responsedata, "Active-Session");

    //         if (responsedata.status === "success") {
    //             fetchData();  // Fetch data if session is valid
    //         } else {
    //             Alert.alert('Session Expired', responsedata.message);
    //             await AsyncStorage.removeItem('userData');
    //             dispatch({ type: 'REMOVE_USER_DATA', payload: {} });

    //             // Ensure loading is set to false after session check failure
    //             setLoading(false);
    //         }

    //     } catch (error) {
    //         console.error('Error during session validation:', error);

    //         // Set loading to false in case of error
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     SessionApi();
    // }, [])

    // useEffect(() => {
    //     // Set loading to true initially
    //     setLoading(true);
    //     SessionApi();
    // }, []);
    

    const [isAlertVisible, setAlertVisible] = useState(false);

    const handleShowAlert = (res) => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 2500);
    };

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {
                    !loading ?
                        (
                            data != null ? (
                                <Stack.Screen name="AppNavigator" component={AppNavigator} />
                            ) :
                                (
                                    <Stack.Screen name="Login Screen" component={LoginScreen} />
                                )
                        ) : (
                            <Stack.Screen name="SplashScreen" component={SplashScreen} />
                        )
                }

                <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                <Stack.Screen name="Reset Password" component={ResetPassword} />
                <Stack.Screen name="Otp" component={Otp} />

            </Stack.Navigator>

            <LottieAlertSucess
                visible={isAlertVisible}
                animationSource={require('../../Assets/Alerts/tick.json')}
                title="Successfully Logged In"
            />

        </>


    )
}

export default AppNav;