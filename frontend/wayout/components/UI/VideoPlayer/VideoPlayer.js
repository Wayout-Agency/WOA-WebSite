import styles from "./VideoPlayer.module.scss";
import Image from "next/image";
import { default as ExpImage } from "next/future/image";
import { useState, useRef } from "react";

const VideoPlayer = ({ filePath, autoPlay = false, fullSize = true }) => {
  const [playerState, setPlayerState] = useState({
    time: "0:00 / 0:00",
    playing: autoPlay,
    muted: autoPlay,
    progress: 0,
  });
  const progress = useRef(null);
  const video = useRef(null);

  const togglePlay = () => {
    if (!playerState.playing) {
      video.current.play();
    } else {
      video.current.pause();
    }
    setPlayerState({ ...playerState, playing: !playerState.playing });
  };

  const setVolume = () => {
    const ref_video = video.current;
    setPlayerState({ ...playerState, muted: !playerState.muted });
    ref_video.volume = ref_video.volume ? 1 : 0;
  };

  const _fixedNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const _formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${_fixedNumber(
      Math.floor(seconds % 60)
    )}`;
  };

  const handleVideoProgress = (event) => {
    setPlayerState({
      ...playerState,
      progress: Number(event.target.value),
    });
  };

  const handleOnTimeUpdate = () => {
    const ref_video = video.current;
    const currentProgress = (100 * ref_video.currentTime) / ref_video.duration;

    const currentTime = Number(ref_video.currentTime.toFixed());
    let duration = `${Math.floor(ref_video.duration / 60)}:${_fixedNumber(
      Math.floor(ref_video.duration % 60)
    )}`;

    setPlayerState({
      ...playerState,
      progress: currentProgress,
      time: _formatTime(currentTime) + " / " + duration,
    });
  };

  const rewind = (e) => {
    setPlayerState({
      ...playerState,
      progress: (100 * e.nativeEvent.offsetX) / progress.current.offsetWidth,
    });
    video.current.currentTime =
      (video.current.duration * e.nativeEvent.offsetX) /
      progress.current.offsetWidth;
  };

  return (
    <div className={fullSize ? styles.videoWrapper : styles.videoWrapperDef}>
      <div className={styles.playWrap}>
        <div className={styles.playBtnWrapper} onClick={togglePlay}>
          {!playerState.playing ? (
            <ExpImage
              src={"/static/img/play.svg"}
              width={94}
              height={109}
              className={styles.playBtn}
            />
          ) : (
            <></>
          )}
        </div>
        <video
          loop
          onTimeUpdate={handleOnTimeUpdate}
          autoPlay={autoPlay}
          muted={playerState.muted}
          ref={video}
          onClick={togglePlay}
          className={styles.video}
          style={{ width: "100%", height: "100%" }}
          onLoadedMetadata={handleOnTimeUpdate}
        >
          <source src={filePath} type="video/mp4" />
        </video>
      </div>
      <div
        className={`${styles.controls} ${
          fullSize ? null : styles.videoWrapperDef
        }`}
      >
        <div className={styles.play} onClick={setVolume}>
          <span className={styles.playText}>ZVYK</span>
          <Image
            className={styles.playIcon}
            src={
              playerState.muted
                ? `/static/img/volume_off.svg`
                : `/static/img/volume_on.svg`
            }
            width="30px"
            height="30px"
            layout="fixed"
          />
        </div>
        <progress
          min="0"
          max="100"
          value={playerState.progress}
          onClick={rewind}
          ref={progress}
          onChange={handleVideoProgress}
        ></progress>
        <p className={styles.time}>{playerState.time}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
