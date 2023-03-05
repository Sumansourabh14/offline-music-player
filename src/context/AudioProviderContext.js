import * as MediaLibrary from "expo-media-library";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { Text, View } from "react-native";

const AudioProviderContext = () => {
  const permissionAlert = () => {
    Alert.alert("Permission required!", "This app needs to read audio files", [
      {
        text: "Allow",
        onPress: () => getPermission(),
      },
      {
        text: "Cancel",
        onPress: () => permissionAlert(),
      },
    ]);
  };

  // Ask for permission to access user's device media assets (library)
  const getPermission = async () => {
    // Check permission status
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);

    if (permission.granted) {
      // get all the audio files
    }

    if (!permission.granted && permission.canAskAgain) {
      // ask for permission to grant access
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === "denied" && canAskAgain) {
        // display alert: "User must allow or the app won't work!"
        permissionAlert();
      }

      if (status === "granted") {
        // get all the audio files
      }

      if (status === "denied" && !canAskAgain) {
        // display an error to the user
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <View>
      <Text>AudioProviderContext</Text>
    </View>
  );
};

export default AudioProviderContext;
