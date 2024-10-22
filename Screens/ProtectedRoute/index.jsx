import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ProtectedRoute = ({ navigation, children }) => {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.login);

  useEffect(() => {

    const checkSession = async () => {

      try {
        const valString = await AsyncStorage.getItem('userData');
        const val = JSON.parse(valString);

        if (val && val.tokenId) {
          const slicedToken = val.token.split('|')[1];; // example of token slicing

          try {
            // API call to validate session
            const apiUrl = `https://office3i.com/development/api/public/api/auth_valid_checking`;
            const response = await axios.post(apiUrl, {
              login_id: val.tokenId,
              token: slicedToken,
            });

            if (response.data.success) {
              setLoading(false); // Session valid, allow navigation
            } else {
              // Session expired or invalid, redirect to login
              setLoading(false);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login Screen' }],
              });
            }
          } catch (error) {
            // API call failed, navigate to login
            setLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login Screen' }],
            });
          }
        } else {
          // No user data, navigate to login
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login Screen' }],
          });
        }
      } catch (error) {
        setLoading(false);
        console.error('Error retrieving session data:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login Screen' }],
        });
      }
    };

    checkSession();
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children;
};

export default ProtectedRoute;
