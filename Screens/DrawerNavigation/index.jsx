import React, { useEffect } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "../CustomDrawerContent";
import BottomTabNavigator from "../BottomNavigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { Alert } from "react-native";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {

  return (
    <Drawer.Navigator
      drawerContent={(drawerProps) => <CustomDrawerContent {...drawerProps} />}
    >
      <Drawer.Screen name="EPK Group" options={{ headerShown: false }} component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;

