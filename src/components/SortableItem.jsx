import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

export const SortableItem = ({ id, name }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          p: 2,
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          cursor: isDragging ? "grabbing" : "grab",
          width: "30px",
          height: "30px",
          overflow: "hidden",
          padding: 1,
        }}
      >
        <img
          src={name}
          alt="Sortable item"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // 画像がBoxを埋めるようにする
          }}
        />
      </Box>
    </div>
  );
};
