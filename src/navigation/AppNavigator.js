import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioList from "../screens/AudioList.screen";
import Player from "../screens/Player.screen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Audio" component={AudioList} />
      <Tab.Screen name="Player" component={Player} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
