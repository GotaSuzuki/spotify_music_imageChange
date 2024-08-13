import React, { useState } from "react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import spotify from "../lib/spotify";
import { useEffect } from "react";

const MainContainer = ({ images }) => {
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  //特定の音楽を取得
  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await spotify.getTrack();
        setTrack(res);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchTrack();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        //Appコンポーネントのimagesのtime(start,end)によってstateに格納
        const currentImg = images.find(
          (img) => audio.currentTime >= img.start && audio.currentTime < img.end
        );
        if (currentImg) {
          setCurrentImage(currentImg.src);
        } else {
          setCurrentImage(images[0]); // どの画像も一致しない場合
        }

        if (audio.currentTime >= 30) {
          audio.pause();
          setIsPlaying(false);
        } else {
          requestAnimationFrame(updateTime);
        }
      };

      audio.addEventListener("play", () => requestAnimationFrame(updateTime));

      return () => {
        audio.removeEventListener("play", () =>
          requestAnimationFrame(updateTime)
        );
      };
    }
  }, [track, images]);

  //再生と停止の制御
  const handlePlayClick = () => {
    if (track && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = track.preview_url;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!track) return <div>Loading...</div>;

  return (
    <div>
      <div
        style={{
          position: "relative",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "10%",
        }}
      >
        <h1 onClick={handlePlayClick} style={{ cursor: "pointer" }}>
          {track.name}
        </h1>
      </div>
      <AnimatePresence>
        {currentImage && (
          <motion.img
            key={currentImage}
            style={{ width: "600px", height: "500px" }}
            src={currentImage}
            alt="Current"
            initial={{ x: 0, y: -200, scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.8 }}
          />
        )}
      </AnimatePresence>
      <audio ref={audioRef} />
      {/* <div>Current Time: {currentTime.toFixed(5)} seconds</div> */}
    </div>
  );
};

export default MainContainer;
