import { useEffect } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  imagesOrderLengthSelector,
  imagesOrderState
} from "../atoms/imagesState";
import useCommon from "../hooks/useCommon";
import { userIdState } from "../atoms/useIdState";
import InputFileUpload from "../components/FileButton";
import React from "react";
import useSupabase from "../hooks/useSupabase";

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
  }, [recoilImagesOrderLength, getImages]);

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

  const { uploadImage } = useSupabase();
  const wrappedUploadImage = async (file: File) => {
    await uploadImage({
      file,
      userId,
      getImages,
      getAllImages,
      enqueueSnackbar
    });
  };

  return (
    <Box mt={4}>
      <SnackbarProvider />
      <Box mb={2}>
        {recoilImagesOrderLength < MAX_IMAGES_LENGTH && (
          <Typography variant="body1" color="textPrimary">
            残りの画像保存枚数：
            <Typography component="span" color="error">
              {MAX_IMAGES_LENGTH - recoilImagesOrderLength}
            </Typography>
          </Typography>
        )}
      </Box>

      <InputFileUpload uploadImage={wrappedUploadImage} />

      <Box mt={2} sx={{ p: 2, border: "2px solid black", overflowX: "auto" }}>
        <DndContext
          onDragEnd={(event) => {
            const { active, over } = event;
            if (!over) return;
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

      <Box mt={2} textAlign="center">
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
      </Box>
    </Box>
  );
};

export default Images;
