import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import grey from "@mui/material/colors/grey";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useContext,
} from "react";
import { useTodoListItem } from "./hooks/useTodoListItem";
import { TodoListActionsContext } from "./TodoListActionsContext";
import { TodoListItemData, TodoListItemState } from "./types";

export const TodoListItem: React.FunctionComponent<
  TodoListItemData & { listKey: TodoListItemState }
> = React.memo(function TodoListItem({ id, listKey, contents }) {
  const [{ isDragging }, handleRef, itemRef] = useTodoListItem(id);
  const todoListActions = useContext(TodoListActionsContext);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      todoListActions?.updateItem({ id, value: e.target.value });
    },
    [id, todoListActions]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;

      todoListActions?.createItem();
    },
    [todoListActions]
  );

  const cursor = isDragging ? "grabbing" : "grab";
  const isDone = listKey === TodoListItemState.Done;

  return (
    <ListItem id={id} ref={itemRef}>
      <ListItemIcon ref={handleRef} sx={{ cursor }}>
        <DragHandleRoundedIcon fontSize="large" htmlColor={grey[800]} />
      </ListItemIcon>
      <InputBase
        value={contents}
        placeholder="I need to..."
        disabled={isDone}
        onChange={handleInputChange}
        onKeyPress={handleKey}
        autoFocus={!contents.length}
        fullWidth
      />
    </ListItem>
  );
});
