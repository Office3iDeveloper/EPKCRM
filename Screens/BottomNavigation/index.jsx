import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStack from "../BottomScreens/ProfileStack";
import HomeStack from "../BottomScreens/HomeStack";
import Svg, { Path } from 'react-native-svg';
import { White } from "../../Assets/Colors";
import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

const HomeIcon = ({ active }) => {

    const iconColor = White;

    return (
        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width={24}
                height={24}
            >
                <Path
                    fill={iconColor}
                    d="M0.5192 5.82274C5.96046e-08 6.77128 0 7.91549 0 10.2039V11.725C0 15.6258 1.19209e-07 17.5763 1.17157 18.7881C2.34315 20 4.22876 20 8 20H12C15.7712 20 17.6569 20 18.8284 18.7881C20 17.5763 20 15.6258 20 11.725V10.2039C20 7.91549 20 6.77128 19.4808 5.82274C18.9616 4.87421 18.0131 4.28551 16.116 3.10812L14.116 1.86687C12.1106 0.62229 11.1079 0 10 0C8.8921 0 7.88939 0.62229 5.88403 1.86687L3.88403 3.10813C1.98695 4.28551 1.0384 4.87421 0.5192 5.82274ZM9.25 16C9.25 16.4142 9.5858 16.75 10 16.75C10.4142 16.75 10.75 16.4142 10.75 16V13C10.75 12.5858 10.4142 12.25 10 12.25C9.5858 12.25 9.25 12.5858 9.25 13V16Z"
                />
            </Svg>
            {active && <View style={{ paddingTop: "3%" }} />}
        </View>
    );
};

const ProfileIcon = ({ active }) => {

    const iconColor = White;

    return (
        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width={24}
                height={24}
            >
                <Path
                    fill={iconColor}
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
            </Svg>
            {active && <View style={{ paddingTop: "3%" }} />}
        </View>

    );
};

const NotificationIcon = ({ active }) => {

    const iconColor = White;

    return (
        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 24"
                width={24}
                height={24}
            >
                <Path
                    fill={iconColor}
                    d="M10.0001 0C9.20994 0 8.57155 0.670312 8.57155 1.5V2.4C5.31262 3.09375 2.85726 6.12187 2.85726 9.75V10.6313C2.85726 12.8344 2.08494 14.9625 0.692086 16.6125L0.361729 17.0016C-0.0132708 17.4422 -0.102557 18.075 0.125122 18.6141C0.352801 19.1531 0.866193 19.5 1.42869 19.5H18.5716C19.1341 19.5 19.643 19.1531 19.8751 18.6141C20.1073 18.075 20.0135 17.4422 19.6385 17.0016L19.3082 16.6125C17.9153 14.9625 17.143 12.8391 17.143 10.6313V9.75C17.143 6.12187 14.6876 3.09375 11.4287 2.4V1.5C11.4287 0.670312 10.7903 0 10.0001 0ZM12.0224 23.1234C12.5582 22.5609 12.8573 21.7969 12.8573 21H10.0001H7.14298C7.14298 21.7969 7.44209 22.5609 7.9778 23.1234C8.51351 23.6859 9.24119 24 10.0001 24C10.7591 24 11.4867 23.6859 12.0224 23.1234Z"
                />
            </Svg>
            {active && <View style={{ paddingTop: "3%" }} />}
        </View>

    );
};

const BottomTabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0879F6',
                    height: 80,
                    padding: 10
                },
                tabBarInactiveTintColor: White,
                tabBarActiveTintColor: White,
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => <HomeIcon active={focused} />,
                    tabBarLabel: '',
                }}
            />
            {/* <Tab.Screen
                name="Notification"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => <NotificationIcon active={focused} />,
                    tabBarLabel: '',
                }}
            /> */}
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => <ProfileIcon active={focused} />,
                    tabBarLabel: '',
                }}
            />

        </Tab.Navigator>
    );
};


export default BottomTabNavigator;
