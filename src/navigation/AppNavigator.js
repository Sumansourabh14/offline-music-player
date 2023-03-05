import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import AudioList from "../screens/AudioList.screen";
import Player from "../screens/Player.screen";

// Screen names - placed on top of the screen and as the label
const screenNames = {
  audioListScreen: "Audio",
  playerScreen: "Player",
};

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#000",
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 10,
          fontWeight: "bold",
        },
        tabBarStyle: {
          padding: 10,
          height: 70,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === screenNames.audioListScreen) {
            iconName = focused ? "musical-note" : "musical-note-outline";
          } else if (rn === screenNames.playerScreen) {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Audio" component={AudioList} />
      <Tab.Screen name="Player" component={Player} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
