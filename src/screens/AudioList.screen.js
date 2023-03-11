import React, { useContext } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AudioContext } from "../context/AudioProviderContext";

const AudioList = () => {
  const { audioFiles } = useContext(AudioContext);

  const dimensions = Dimensions.get("window");
  console.log(dimensions.width);

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 8,
    },
    audio: {
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      width: dimensions.width - 10,
      marginVertical: 8,
      borderRadius: 8,
      height: 60,
    },
    screenTitle: {
      fontSize: 20,
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    audioTitle: {
      paddingLeft: 6,
      width: dimensions.width - 110,
    },
    rightContainer: {
      flexBasis: 40,
    },
    trackCover: {
      backgroundColor: "yellow",
      justifyContent: "center",
      alignItems: "center",
      flexBasis: 60,
      height: 60,
      borderRadius: 8,
    },
  });

  // console.log(typeof audioFiles);
  // console.log(audioFiles);

  const convertDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    if (minutes < 10) {
      if (seconds < 10) {
        return `0${minutes}:0${seconds}`;
      } else {
        return `0${minutes}:${seconds}`;
      }
    }

    if (seconds >= 10) {
      return `${minutes}:${seconds}`;
    }

    return `${minutes}:0${seconds}`;
  };

  const onOptionsPress = () => {
    console.log("Options menu pressed.");
  };

  // console.log(convertDuration());

  return (
    <View style={styles.container}>
      <FlatList
        data={audioFiles}
        renderItem={({ item }) => (
          <View style={styles.audio}>
            <View style={styles.leftContainer}>
              <View style={styles.trackCover}>
                <Ionicons name="musical-notes-outline" size={20} />
              </View>
              <View style={styles.audioTitle}>
                <Text numberOfLines={1} style={{ marginBottom: 4 }}>
                  {item?.filename}
                </Text>
                <Text style={{ color: "#c0c0c0" }}>
                  {convertDuration(Math.floor(item?.duration))}
                </Text>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <TouchableOpacity onPress={onOptionsPress}>
                <Ionicons name="ellipsis-vertical-outline" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};

export default AudioList;
