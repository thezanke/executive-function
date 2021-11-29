import { useCallback, useContext } from "react";
import { useDrop } from "react-dnd";
import { TodoListActionsContext } from "../TodoListActionsContext";
import { DraggableType, TodoListItemState } from "../types";

export const useTodoSubList = (listKey: TodoListItemState) => {
  const todoListActions = useContext(TodoListActionsContext);

  const handleItemDrop = useCallback(
    (item: { id: string, listKey: TodoListItemState }) => {
      todoListActions?.moveItem({ id: item.id, to: listKey });
    },
    [todoListActions, listKey]
  );

  return useDrop(
    () => ({
      accept: DraggableType.ListItem,
      drop: handleItemDrop,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [listKey]
  );
}