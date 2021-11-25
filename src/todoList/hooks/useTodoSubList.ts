import { useCallback, useContext } from "react";
import { useDrop } from "react-dnd";
import { DispatchContext } from "../dispatch.context";
import { DraggableType, TodoListActionType, TodoListKeys } from "../types";

export const useTodoSubList = (listKey: TodoListKeys) => {
  const dispatch = useContext(DispatchContext);

  const handleItemDrop = useCallback(
    (item: { id: string, listKey: TodoListKeys }) => {
      if (!dispatch) return;

      dispatch({
        type: TodoListActionType.MoveItem,
        data: { id: item.id, from: item.listKey, to: listKey },
      });
    },
    [dispatch, listKey]
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