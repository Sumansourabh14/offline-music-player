// Separate file for audio controlling functions

// Play audio
export const play = async (playbackObject, uri) => {
  try {
    const status = await playbackObject.loadAsync(
      {
        uri: uri,
      },
      {
        shouldPlay: true,
      }
    );
    return status;
  } catch (error) {
    console.log("Error playing the audio:", error);
  }
};

// Pause audio
export const pause = async (playbackObject) => {
  try {
    const status = await playbackObject.pauseAsync();
    return status;
  } catch (error) {
    console.log("Error pausing the audio:", error);
  }
};

// Resume audio
export const resume = async (playbackObject) => {
  try {
    const status = await playbackObject.playAsync();
    return status;
  } catch (error) {
    console.log("Error resuming the audio:", error);
  }
};

// Select another audio
export const playAnotherAudio = async (playbackObject, uri) => {
  console.log("playbackObject:", playbackObject);
  console.log("uri:", uri);

  try {
    // const currentPosition = await playbackObject.getPositionAsync(); // store current playback position

    await playbackObject.stopAsync();
    await playbackObject.unloadAsync();

    const status = await play(playbackObject, uri);
    // await playbackObject.setPositionAsync(currentPosition); // set new audio playback position to the stored position

    return status;
  } catch (error) {
    console.log("Error playing another audio:", error);
  }
};
