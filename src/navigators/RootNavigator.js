import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator } from "./HomeNavigator"
import { TabNavigator } from "./TabNavigator"
import { AuthContext } from '../context/AuthContext';
import { Landing } from "~/screens/Landing/Landing";

const Stack = createStackNavigator();

export function RootNavigator() {
  const authContext = useContext(AuthContext)
  const {
    currentUser, onboarding
  } = authContext

  return (
    <>
      { currentUser === null || onboarding ? (
        <TabNavigator />
        // <Stack.Navigator
        //   headerMode="none"
        // >
        //   <Stack.Screen name="Landing" component={Landing} />
        //   {/* <Stack.Screen name="Login" component={Login} />
        //   <Stack.Screen name="SignUp" component={SignUp} />
        //   <Stack.Screen name="Causes" component={Causes} />
        //   <Stack.Screen name="Skills" component={Skills} />
        //   <Stack.Screen name="CreateUserProfile" component={CreateUserProfile} />
        //   <Stack.Screen name="Success" component={Success} /> */}
        // </Stack.Navigator>
      ) : (
        <HomeNavigator />
      )}
    </>

  );
}
