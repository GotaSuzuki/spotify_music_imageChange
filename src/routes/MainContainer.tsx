import { useState } from "react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import spotify from "../lib/spotify";
import { useEffect } from "react";
import { imagesOrderState } from "../atoms/imagesState";
import useCommon from "../hooks/useCommon";
import { useRecoilValue } from "recoil";
import ReactFullscreen from "react-easyfullscreen";
import { Button } from "@mui/material";
import React from "react";

type Track = {
  preview_url: string;
};

const MainContainer = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const recoilImagesOrder = useRecoilValue(imagesOrderState);

  const { getImages } = useCommon();

  // 初回に画像が保存されていないときに実行
  useEffect(() => {
    const fetchData = async () => {
      if (recoilImagesOrder.length === 0) {
        await getImages();
      }
    };

    fetchData();
  }, []);

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

  // 音楽の再生している秒数とrecoilImagesOrderに保存されている秒数が一致している画像のUrlをセット
  useEffect(() => {
    if (audioRef.current) {
      const audio: {
        pause(): unknown;
        removeEventListener(arg0: string, arg1: () => number): unknown;
        addEventListener(arg0: string, arg1: () => number): unknown;
        currentTime: number;
      } = audioRef.current;

      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        //recoilImagesOrderのtime(start,end)によってstateに格納
        const currentImg = recoilImagesOrder.find(
          (img) => audio.currentTime >= img.start && audio.currentTime < img.end
        );
        if (currentImg) {
          setCurrentImage(currentImg.publicUrl); // 画像のUrlをセット
        } else {
          setCurrentImage(recoilImagesOrder[0]?.publicUrl || null); // どの画像も一致しない場合
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
  }, [track, recoilImagesOrder]);

  //再生と停止の制御
  const handlePlayClick = () => {
    if (track && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.src = track.preview_url;
        audioRef.current.play();
        setIsFullScreen(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!track) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h1
          onClick={handlePlayClick}
          style={{ cursor: "pointer", marginTop: "45px" }}>
          {isPlaying ? <div>停止</div> : <div>再生</div>}
        </h1>
      </div>

      <audio ref={audioRef} />
      <ReactFullscreen>
        {({ ref, onRequest }) => (
          <div
            ref={ref as unknown as React.RefObject<HTMLDivElement>}
            style={{ width: "100%", height: "100%" }}>
            {!isFullScreen && (
              <div>
                <Button variant="outlined" onClick={() => onRequest()}>
                  FullScreen
                </Button>
              </div>
            )}
            <AnimatePresence>
              {currentImage && (
                <motion.img
                  key={currentImage}
                  style={
                    isFullScreen
                      ? { width: "100%", height: "100%" }
                      : { width: "500px", height: "500px" }
                  }
                  src={currentImage}
                  initial={{ x: 0, y: -200, scale: 0 }}
                  animate={{ x: 0, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.8 }}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </ReactFullscreen>
    </div>
  );
};

export default MainContainer;
