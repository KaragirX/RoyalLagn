import React from "react";
import { StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

export default function PortfolioVideoPlayer({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (instance) => {
    instance.loop = false;
  });
  return (
    <VideoView
      player={player}
      style={styles.video}
      contentFit="contain"
      nativeControls
      allowsFullscreen
      allowsPictureInPicture
    />
  );
}

const styles = StyleSheet.create({
  video: { width: "100%", height: "100%" },
});
