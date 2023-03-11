import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AudioContext } from "../context/AudioProviderContext";

const OptionsModal = ({ visible, onclose, onPlayPress, onPlaylistPress }) => {
  return (
    <>
      <Modal transparent animationType="slide" visible={visible}>
        <View style={modalStyles.modal}>
          <View>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <Text style={modalStyles.text}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPlaylistPress}>
              <Text style={modalStyles.text}>Add to playlist</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* Hide modal when tapped anywhere (outside the modal) */}
        <TouchableWithoutFeedback onPress={onclose}>
          <View style={modalStyles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const AudioList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [playbackObj, setPlaybackObj] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [currentAudio, setCurrentAudio] = useState({});

  const { audioFiles } = useContext(AudioContext);

  const dimensions = Dimensions.get("window");

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
      width: dimensions.width - 130,
    },
    rightContainer: {
      flexBasis: 50,
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

  // console.log(convertDuration());

  const onAudioPress = async (audio) => {
    console.log(audio);

    // Playing audio for the first time
    // If soundObj is null, means no audio is playing currently
    if (soundObj === null) {
      const playbackObject = new Audio.Sound();
      const status = await playbackObject.loadAsync(
        {
          uri: audio.uri,
        },
        {
          shouldPlay: true,
        }
      );

      console.log("playing");

      return (
        setPlaybackObj(playbackObject),
        setSoundObj(status),
        setCurrentAudio(audio)
      );
    }

    // Pause the audio if it is playing
    if (soundObj.isLoaded && soundObj.isPlaying) {
      const status = setPlaybackObj(
        playbackObj.setStatusAsync({
          shouldPlay: false,
        })
      );

      console.log("paused");

      return setSoundObj(status);
    }

    // Resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = setPlaybackObj(playbackObj.playAsync());

      return setSoundObj(status);
    }
  };

  return (
    <View style={styles.container}>
      <OptionsModal
        visible={openModal}
        onclose={() => setOpenModal(false)}
        onPlayPress={() => console.log("Playing audio")}
        onPlaylistPress={() => console.log("adding in playlist")}
      />
      <FlatList
        data={audioFiles}
        renderItem={({ item }) => (
          <View style={styles.audio}>
            <TouchableWithoutFeedback onPress={() => onAudioPress(item)}>
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
            </TouchableWithoutFeedback>
            <View style={styles.rightContainer}>
              <TouchableOpacity onPress={() => setOpenModal(true)}>
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={30}
                  style={{
                    padding: 10,
                  }}
                />
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

const modalStyles = StyleSheet.create({
  modal: {
    backgroundColor: "#FFF",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 14,
    fontWeight: "bold",
  },
  modalBg: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});
