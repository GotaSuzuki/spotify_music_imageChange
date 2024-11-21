import { useState } from "react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import spotify from "../lib/spotify";
import { useEffect } from "react";
import { imagesOrderState } from "../atoms/imagesState";
import useCommon from "../hooks/useCommon";
import { useRecoilValue } from "recoil";
import ReactFullscreen from "react-easyfullscreen";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Typography
} from "@mui/material";
import React from "react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { Track } from "../types";

const MainContainer = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const recoilImagesOrder = useRecoilValue(imagesOrderState);
  const { handlePlayClick } = useCommon();

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

  const onPlayClick = () => {
    handlePlayClick({
      track,
      audioRef,
      isPlaying,
      setIsPlaying,
      setIsFullScreen
    });
  };

  if (error) return <Typography color="error">エラー: {error}</Typography>;
  if (!track)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh">
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography
          variant="h4"
          onClick={onPlayClick}
          sx={{
            cursor: "pointer",
            userSelect: "none",
            mb: 2
          }}>
          {isPlaying ? "停止" : "再生"}
        </Typography>

        <audio ref={audioRef} />

        <ReactFullscreen>
          {({ ref, onRequest, onExit }) => (
            <Box
              ref={ref as unknown as React.RefObject<HTMLDivElement>}
              width="100%"
              height="auto"
              position="relative">
              {!isFullScreen && (
                <Box textAlign="center" mb={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onRequest();
                      setIsFullScreen(true);
                    }}
                    startIcon={<Fullscreen />}>
                    フルスクリーン
                  </Button>
                </Box>
              )}

              {isFullScreen && (
                <IconButton
                  onClick={() => {
                    onExit();
                    setIsFullScreen(false);
                  }}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1000,
                    color: "white"
                  }}>
                  <FullscreenExit />
                </IconButton>
              )}

              <AnimatePresence>
                {currentImage && (
                  <motion.img
                    key={currentImage}
                    src={currentImage}
                    style={{
                      width: isFullScreen ? "100vw" : "100%",
                      height: isFullScreen ? "100vh" : "auto",
                      objectFit: "contain"
                    }}
                    initial={{ x: 0, y: -200, scale: 0 }}
                    animate={{ x: 0, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.8 }}
                  />
                )}
              </AnimatePresence>
            </Box>
          )}
        </ReactFullscreen>
      </Box>
    </Container>
  );
};

export default MainContainer;
