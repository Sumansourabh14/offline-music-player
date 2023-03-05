import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { AudioContext } from "../context/AudioProviderContext";

const AudioList = () => {
  const { audioFiles } = useContext(AudioContext);

  console.log(typeof audioFiles);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ paddingVertical: 5 }}></View>
        <Text style={styles.screenTitle}>{audioFiles?.length} Songs</Text>
        <View>
          {audioFiles.map((audio) => (
            <View key={audio?.id} style={styles.audio}>
              <Text>{audio?.filename}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AudioList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audio: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
