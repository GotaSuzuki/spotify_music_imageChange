import { useEffect } from "react";
import supabase from "../lib/supabase";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  imagesOrderLengthSelector,
  imagesOrderState
} from "../atoms/imagesState";
import useCommon from "../hooks/useCommon";
import { userIdState } from "../atoms/useIdState";
import InputFileUpload from "../components/FileButton";
import React from "react";

const Images = () => {
  const originalTimes = [
    0, 2.5, 4.4, 6.2, 8, 9.8, 11.7, 13.6, 15.5, 17.3, 19.1, 21, 22.8, 24.6,
    26.4, 28.2, 30
  ];
  const MAX_IMAGES_LENGTH = 16;

  const userId = useRecoilValue(userIdState);
  const recoilImagesOrderLength = useRecoilValue(imagesOrderLengthSelector);
  const [recoilImagesOrder, setRecoilImagesOrder] =
    useRecoilState(imagesOrderState);

  const { getImages, getAllImages } = useCommon();

  useEffect(() => {
    if (recoilImagesOrderLength === 0) {
      getImages();
    }
  }, []);

  const saveMedia = () => {
    const newImages = recoilImagesOrder.map((image, index) => {
      const start = originalTimes[index];
      const end = originalTimes[index + 1];
      return {
        ...image,
        start,
        end,
        id: image.id,
        publicUrl: image.publicUrl
      };
    });

    setRecoilImagesOrder(newImages);
  };

  const action = (key) => (
    <IconButton
      aria-label="Close"
      color="inherit"
      onClick={() => closeSnackbar(key)}>
      <CloseIcon />
    </IconButton>
  );

  const uploadImage = async (file) => {
    try {
      const fileName = userId + file.name;

      const { data: existingFile } = await supabase.storage
        .from("images")
        .list("", {
          limit: 1,
          offset: 0,
          search: fileName
        });

      if (existingFile && existingFile.length > 0) {
        alert("同じファイル名で登録することは出来ません");
        return;
      }

      const { error } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      //  Images.jsxのリストを更新するため
      await getImages();
      // ImagesList.jsxのリストを更新するため
      await getAllImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("画像のアップロードに失敗しました。");
    }
  };

  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <SnackbarProvider />
      </div>
      <div>
        {recoilImagesOrderLength < MAX_IMAGES_LENGTH && (
          <div>
            残りの画像保存枚数：
            <span style={{ color: "red" }}>
              {MAX_IMAGES_LENGTH - recoilImagesOrderLength}
            </span>
          </div>
        )}
      </div>

      <InputFileUpload uploadImage={uploadImage} />
      <div>
        <Box sx={{ padding: 1 }}>
          <Box
            sx={{
              p: 2,
              border: "2px solid black",
              overflowX: "auto",
              width: "fit-content",
              maxWidth: "100%",
              display: "inline-block"
            }}>
            <DndContext
              onDragEnd={(event) => {
                const { active, over } = event;
                if (over == null) {
                  return;
                }
                if (active.id !== over.id) {
                  setRecoilImagesOrder((media) => {
                    const oldIndex = media.findIndex(
                      (image) => image.id === active.id
                    );
                    const newIndex = media.findIndex(
                      (image) => image.id === over.id
                    );
                    return arrayMove(media, oldIndex, newIndex);
                  });
                }
              }}>
              <SortableContext items={recoilImagesOrder}>
                <Stack direction="row" spacing={2} sx={{ flexWrap: "nowrap" }}>
                  {recoilImagesOrder.map((image) => (
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
                horizontal: "center"
              },
              action
            });
          }}>
          保存
        </Button>
      </div>
    </>
  );
};

export default Images;
