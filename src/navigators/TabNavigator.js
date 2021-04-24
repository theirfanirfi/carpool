import React from "react";
import { Dimensions, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../constants/Colors";
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'


// import { HomeStack } from "./HomeNavigator";
// import { ExploreStack } from "./ExploreNavigator";
// import { AccountStack } from "./AccountNavigator";
// import { SearchProvider } from "../context/SearchContext";

import HomeScreen from '../screens/HomeScreen'

const RootNavigationTab = createBottomTabNavigator();

const Stack = createStackNavigator();
const { width } = Dimensions.get('window')


function headerOptions(navigator) {
  return (
    {
      headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#18BAFF', height: 60 },
      headerTitleStyle: { alignSelf: 'center', color: 'white' },
      headerRight: (nav) => {
        return (
          <TouchableOpacity>
            <Icon name="download-outline" type="ionicon" color="white" size={28} style={{ marginHorizontal: 12 }} />
          </TouchableOpacity>
        )
      },
    }
  )
}

export function TabNavigator() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor="#18BAFF" />
      <RootNavigationTab.Navigator
        initialRouteName="Earnings"
        show
        tabBarOptions={{
          activeTintColor: Colors.primary.lightBlue,
          inactiveTintColor: Colors.primary.gray,
          style: {
            backgroundColor: Colors.primary.white,
            alignItems: 'flex-start',
          }
        }}
      >
        <RootNavigationTab.Screen
          name="Earnings"
          screenOptions={headerOptions}
          options={{
            tabBarIcon: ({ color }) => <Icon name="business-outline" type='ionicon' color={color} size={25} />,
          }}
          component={earningNavigator}
        />
      </RootNavigationTab.Navigator>
    </>

  );
}

function earningNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="Earnings" screenOptions={headerOptions(navigator)}>
      <Stack.Screen name="Earnings" component={HomeScreen} />

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.darkBlue
  },
  iconContainer: {
    flex: 1,
    borderTopWidth: 3,
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icons: {
    tintColor: Colors.primary.white,
    width: 26,
    resizeMode: 'contain'
  },
  label: {
    fontWeight: '500',
    fontSize: width * 0.03,
  }
})
