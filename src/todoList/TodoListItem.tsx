import DragHandleIcon from "@mui/icons-material/DragHandle";
import { InputBase, ListItemIcon } from "@mui/material";
import { grey } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import React, { ChangeEvent, useCallback, useContext } from "react";
import { TodoListActionsContext } from "./todoListActions.context";
import { useTodoListItem } from "./hooks/useTodoListItem";
import { TodoListItemData, TodoListItemState } from "./types";

export const TodoListItem: React.FunctionComponent<
  TodoListItemData & { listKey: TodoListItemState }
> = ({ id, listKey, contents }) => {
  const [{ isDragging }, handleRef, itemRef] = useTodoListItem(id);
  const todoListActions = useContext(TodoListActionsContext);
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      todoListActions?.updateItem({ id, value: e.target.value });
    },
    [id, todoListActions]
  );

  const cursor = isDragging ? "grabbing" : "grab";
  const isDone = listKey === TodoListItemState.Done;

  return (
    <ListItem ref={itemRef} sx={{ cursor }} disablePadding>
      <ListItemIcon ref={handleRef} sx={{ justifyContent: "center" }}>
        <DragHandleIcon fontSize="medium" htmlColor={grey[600]} />
      </ListItemIcon>
      <InputBase
        value={contents}
        placeholder="I need to..."
        disabled={isDone}
        onChange={handleInputChange}
      />
    </ListItem>
  );
};
