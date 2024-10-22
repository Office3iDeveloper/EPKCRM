import React from "react";
import AppNav from "./Components/AppNav";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { PrimaryBlue } from "./Assets/Colors";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#20DDFE'} barStyle="dark-content" />
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
      </Provider>
  )
}

export default App;