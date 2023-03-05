import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

const AudioList = () => {
  const getPermission = async () => {
    // Check permission status
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);
  };

  useEffect(() => {
    getPermission();
  }, []);
  return (
    <View style={styles.container}>
      <Text>AudioList</Text>
    </View>
  );
};

export default AudioList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
