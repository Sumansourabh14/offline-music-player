import React, { useContext } from "react";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { AudioContext } from "../context/AudioProviderContext";

// const Audio = ({ title }) => {
//   <View style={styles.audio}>
//     <Text>{title}</Text>
//   </View>;
// };

const AudioList = () => {
  const { audioFiles } = useContext(AudioContext);

  console.log(typeof audioFiles);
  console.log(audioFiles);
  return (
    <View style={styles.container}>
      {/* <View style={{ paddingVertical: 5 }}></View> */}
      {/* <Text style={styles.screenTitle}>{audioFiles?.length} Songs</Text> */}
      {/* <View>
          {audioFiles.map((audio) => (
            <View key={audio?.id} style={styles.audio}>
              <Text>{audio?.filename}</Text>
            </View>
          ))}
        </View> */}
      {/* <View> */}
      <FlatList
        data={audioFiles}
        renderItem={({ item }) => (
          <View style={styles.audio}>
            <View style={styles.leftContainer}>
              <View style={styles.trackCover}>
                <Text>A</Text>
              </View>
              <View>
                <Text>{item?.filename}</Text>
                <Text>{Math.floor(item?.duration)}</Text>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text>...</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item?.id}
      />
      {/* </View> */}
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
  audio: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  leftContainer: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  trackCover: {
    backgroundColor: "blue",
    width: 30,
    height: 30,
  },
});
