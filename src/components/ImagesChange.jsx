import React from "react";
import { SortableItem } from "./SortableItem";
import { Box, Stack } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

export const ImagesChange = ({ images, setImages }) => {
  const originalTimes = [
    0, 2.5, 4.4, 6.2, 8, 9.8, 11.7, 13.6, 15.5, 17.3, 19.1, 21, 22.8, 24.6,
    26.4, 28.2, 30,
  ];

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

  return (
    <div>
      {" "}
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
    </div>
  );
};
