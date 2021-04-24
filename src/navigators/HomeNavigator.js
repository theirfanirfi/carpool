import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, SafeAreaView } from "react-native";
import { Home } from '../screens/Home/Home';
import { Colors } from "../constants/Colors";

const Stack = createStackNavigator();

export function HomeStack() {

  return (
    null
    // <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary.darkBlue}} >
    //     <StatusBar barStyle={'light-content'} backgroundColor={Colors.primary.darkBlue} />
    //     <Stack.Navigator
    //     headerMode="none"
    //     >
    //     <Stack.Screen name="Feed" component={Home} />

    //     {/* <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="SignUp" component={SignUp} /> */}
    //     </Stack.Navigator>
    // </SafeAreaView>

  );
}