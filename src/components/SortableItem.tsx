// typescriptの導入とMUIに統一,CSSの調整

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import React from "react";
import { SortableItemProps } from "../types";

export const SortableItem = ({ id, name }: SortableItemProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id
  });

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        display: "inline-block"
      }}>
      <Box
        sx={{
          border: "1px solid black",
          p: 2,
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          cursor: isDragging ? "grabbing" : "grab",
          width: 30,
          height: 30,
          overflow: "hidden"
        }}>
        <img
          src={name}
          alt="Sortable item"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover" // 画像がBoxを埋めるようにする
          }}
        />
      </Box>
    </Box>
  );
};
