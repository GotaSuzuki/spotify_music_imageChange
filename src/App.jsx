import { useEffect } from "react";
import "./App.css";
import spotify from "./lib/spotify";
import { useState } from "react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SortableItem } from "./components/SortableItem";
import { Box, Stack } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

function App() {
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const originalTimes = [
    0, 2.5, 4.4, 6.2, 8, 9.8, 11.7, 13.6, 15.5, 17.3, 19.1, 21, 22.8, 24.6,
    26.4, 28.2, 30,
  ];

  const [images, setImages] = useState([
    { src: "/images/image1.jpg", start: 0, end: 2.5, id: 1 },
    { src: "/images/image2.jpg", start: 2.5, end: 4.4, id: 2 },
    { src: "/images/image3.jpg", start: 4.4, end: 6.2, id: 3 },
    { src: "/images/image4.jpg", start: 6.2, end: 8, id: 4 },
    { src: "/images/image5.jpg", start: 8, end: 9.8, id: 5 },
    { src: "/images/image1.jpg", start: 9.8, end: 11.7, id: 6 },
    { src: "/images/image2.jpg", start: 11.7, end: 13.6, id: 7 },
    { src: "/images/image3.jpg", start: 13.6, end: 15.5, id: 8 },
    { src: "/images/image4.jpg", start: 15.5, end: 17.3, id: 9 },
    { src: "/images/image1.jpg", start: 17.3, end: 19.1, id: 10 },
    { src: "/images/image2.jpg", start: 19.1, end: 21, id: 11 },
    { src: "/images/image3.jpg", start: 21, end: 22.8, id: 12 },
    { src: "/images/image4.jpg", start: 22.8, end: 24.6, id: 13 },
    { src: "/images/image5.jpg", start: 24.6, end: 26.4, id: 14 },
    { src: "/images/image1.jpg", start: 26.4, end: 28.2, id: 15 },
    { src: "/images/image2.jpg", start: 28.2, end: 30, id: 16 },
  ]);

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
        //上記のimagesのtime(start,end)によってstateに格納
        const currentImg = images.find(
          (img) => audio.currentTime >= img.start && audio.currentTime < img.end
        );
        if (currentImg) {
          setCurrentImage(currentImg.src);
        } else {
          setCurrentImage(null); // どの画像も一致しない場合
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

  //start,endの秒数の更新をoriginalTimesを用いてゴリ押し
  const saveImages = () => {
    const newImages = images.map((image, index) => {
      const start = originalTimes[index];
      const end = originalTimes[index + 1];
      return {
        ...image,
        start,
        end,
      };
    });

    setImages(newImages);
  };

  if (error) return <div>Error: {error}</div>;
  if (!track) return <div>Loading...</div>;

  return (
    <>
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
      <Box sx={{ padding: 1 }}>
        <Box sx={{ p: 2, border: "2px solid black", overflowX: "auto" }}>
          <DndContext
            onDragEnd={(event) => {
              const { active, over } = event;
              if (over == null) {
                return;
              }
              if (active.id !== over.id) {
                setImages((images) => {
                  const oldIndex = images.findIndex(
                    (image) => image.id === active.id
                  );
                  const newIndex = images.findIndex(
                    (image) => image.id === over.id
                  );
                  return arrayMove(images, oldIndex, newIndex);
                });
              }
            }}
          >
            <SortableContext items={images}>
              <Stack direction="row" spacing={2} sx={{ flexWrap: "nowrap" }}>
                {images.map((image) => (
                  <SortableItem id={image.id} name={image.src} key={image.id} />
                ))}
              </Stack>
            </SortableContext>
          </DndContext>
        </Box>
      </Box>
      <button onClick={saveImages}>保存</button>
    </>
  );
}

export default App;
