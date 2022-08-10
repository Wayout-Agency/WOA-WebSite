import styles from "./VideoPlayer.module.scss";
import Image from "next/image";
import { useState, useRef } from "react";

const VideoPlayer = ({ filename, autoPlay = false, className = "" }) => {
  const [time, setTime] = useState("");
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMute] = useState(autoPlay);
  const video = useRef(null);
  const progress = useRef(null);

  const startStopVideo = () => {
    const current_video = video.current;
    if (!playing) {
      current_video.play();
      setPlaying(true);
    } else {
      current_video.pause();
      setPlaying(false);
    }
  };

  const setVolume = () => {
    const current_video = video.current;
    if (muted) {
      setMute(false);
      current_video.volume = 1;
      return;
    }
    setMute(true);
  };

  const fixedNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${fixedNumber(
      Math.floor(seconds % 60)
    )}`;
  };

  const onPlay = () => {
    const current_video = video.current;
    const current_progress = progress.current;

    current_progress.value =
      (100 * current_video.currentTime) / current_video.duration;

    const currentTime = Number(current_video.currentTime.toFixed());

    let duration = `${Math.floor(current_video.duration / 60)}:${fixedNumber(
      Math.floor(current_video.duration % 60)
    )}`;

    setTime(formatTime(currentTime) + " / " + duration);
  };

  const rewind = (e) => {
    const current_video = video.current;
    const current_progress = progress.current;
    current_progress.value =
      (100 * e.nativeEvent.offsetX) / current_progress.offsetWidth;
    current_video.currentTime =
      (current_video.duration * e.nativeEvent.offsetX) /
      current_progress.offsetWidth;
  };

  return (
    <div className={`${styles.videoWrapper} ${className}`}>
      <video
        onTimeUpdate={onPlay}
        autoPlay={autoPlay}
        muted={muted}
        loop
        ref={video}
        className={styles.video}
        src={`/static/video/${filename}`}
        style={{ width: "100%", height: "100%" }}
        onClick={startStopVideo}
      />
      <div className={styles.controls}>
        <div className={styles.play} onClick={setVolume}>
          <span className={styles.playText}>ZVYK</span>
          <Image
            className={styles.playIcon}
            src={
              muted ? `/static/img/volume_off.svg` : `/static/img/volume_on.svg`
            }
            width="30px"
            height="30px"
            layout="fixed"
          />
        </div>
        <progress max="100" ref={progress} onClick={rewind}></progress>
        <p className={styles.time}>{time}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
