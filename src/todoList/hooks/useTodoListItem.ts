import { useDrag } from "react-dnd";
import { DraggableType } from "../types";

export const useTodoListItem = (id: string) => {
  return useDrag(
    () => ({
      type: DraggableType.ListItem,
      item: { id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id]
  );
};
