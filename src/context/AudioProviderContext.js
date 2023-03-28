import * as MediaLibrary from "expo-media-library";
import React, { createContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Alert } from "react-native";

export const AudioContext = createContext();

const AudioProviderContext = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);
  // const [state, setState] = useState({});
  // const [playbackObj, setPlaybackObj] = useState(null);
  // const [soundObj, setSoundObj] = useState(null);
  // const [currentAudio, setCurrentAudio] = useState({});

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

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount, // get all the audio items
    });

    setAudioFiles(media?.assets);

    // console.log(media?.assets.length);
  };

  // Ask for permission to access user's device media assets (library)
  const getPermission = async () => {
    // Check permission status
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);

    if (permission.granted) {
      // get all the audio files
      getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
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
        getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        // display an error to the user
        setPermissionError(true);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  // const updateState = (newState = {}) => {
  //   setState((prevState) => ({ ...prevState, ...newState }));
  // };

  if (permissionError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          It looks like you haven't accepted the permission :(
        </Text>
      </View>
    );
  }

  return (
    <AudioContext.Provider value={{ audioFiles }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProviderContext;
