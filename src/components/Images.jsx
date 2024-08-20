import React, { useEffect } from "react";
import supabase from "../lib/supabase";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack";
import { useRecoilState, useRecoilValue } from "recoil";
import { imagesState, recoilImagesLengthSelector } from "../atoms/imagesState";
import useCommon from "../hooks/useCommon";
import { userIdState } from "../atoms/useIdState";

const Images = () => {
  const originalTimes = [
    0, 2.5, 4.4, 6.2, 8, 9.8, 11.7, 13.6, 15.5, 17.3, 19.1, 21, 22.8, 24.6,
    26.4, 28.2, 30,
  ];
  const MAX_IMAGES_LENGTH = 16;

  const [recoilImages, setRecoilImages] = useRecoilState(imagesState);
  const userId = useRecoilValue(userIdState);
  const recoilImagesLength = useRecoilValue(recoilImagesLengthSelector);

  const { getImages } = useCommon();

  useEffect(() => {
    if (recoilImagesLength === 0) {
      getImages();
    }
  }, []);

  const saveMedia = () => {
    const newImages = recoilImages.map((image, index) => {
      const start = originalTimes[index];
      const end = originalTimes[index + 1];
      return {
        ...image,
        start,
        end,
      };
    });

    setRecoilImages(newImages);
  };

  const action = (key) => (
    <IconButton
      aria-label="Close"
      color="inherit"
      onClick={() => closeSnackbar(key)}
    >
      <CloseIcon />
    </IconButton>
  );

  const uploadImage = async (e) => {
    let file = e.target.files[0];
    const fileName = userId + file.name;

    const { data: existingFile, error: duplicateError } = await supabase.storage
      .from("images")
      .list("", {
        limit: 1,
        offset: 0,
        search: fileName,
      });

    if (existingFile && existingFile.length > 0) {
      alert("同じファイル名で登録することは出来ません");
      return;
    }

    const { data, error } = await supabase.storage
      .from("images")
      .upload(userId + file.name, file);

    if (error) {
      console.error("Error uploading image:", error);
    } else {
      getImages(); // アップロード後に画像リストを更新
    }
  };

  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <SnackbarProvider />
      </div>
      <div>
        {recoilImagesLength < MAX_IMAGES_LENGTH && (
          <div>
            残りの画像保存枚数：
            <span style={{ color: "red" }}>
              {MAX_IMAGES_LENGTH - recoilImagesLength}
            </span>
          </div>
        )}
      </div>
      <div className="mt-5">
        <input type="file" onChange={(e) => uploadImage(e)} />
      </div>
      <div>
        <Box sx={{ padding: 1 }}>
          <Box sx={{ p: 2, border: "2px solid black", overflowX: "auto" }}>
            <DndContext
              onDragEnd={(event) => {
                const { active, over } = event;
                if (over == null) {
                  return;
                }
                if (active.id !== over.id) {
                  setRecoilImages((media) => {
                    const oldIndex = media.findIndex(
                      (image) => image.id === active.id
                    );
                    const newIndex = media.findIndex(
                      (image) => image.id === over.id
                    );
                    return arrayMove(media, oldIndex, newIndex);
                  });
                }
              }}
            >
              <SortableContext items={recoilImages}>
                <Stack direction="row" spacing={2} sx={{ flexWrap: "nowrap" }}>
                  {recoilImages.map((image) => (
                    <SortableItem
                      id={image.id}
                      name={image.publicUrl}
                      key={image.id}
                    />
                  ))}
                </Stack>
              </SortableContext>
            </DndContext>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            saveMedia();
            enqueueSnackbar("保存成功", {
              variant: "success",
              autoHideDuration: 3000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              action,
            });
          }}
        >
          保存
        </Button>
      </div>
    </>
  );
};

export default Images;
