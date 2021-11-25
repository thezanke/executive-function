import { useDrag } from "react-dnd";
import { DraggableType, TodoListKeys } from "../types";

export const useTodoListItem = (id:string, listKey: TodoListKeys) => {
  return useDrag(
    () => ({
      type: DraggableType.ListItem,
      item: { id, listKey },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, listKey]
  );
}