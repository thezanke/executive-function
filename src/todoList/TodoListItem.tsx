import DragHandleIcon from "@mui/icons-material/DragHandle";
import { InputBase, ListItemIcon } from "@mui/material";
import { grey } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
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
> = React.memo(({ id, listKey, contents }) => {
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
      if (e.key === "Enter") {
        console.log("test");
        todoListActions?.createItem();
      }
    },
    [todoListActions]
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
        onKeyPress={handleKey}
        autoFocus={!contents.length}
        fullWidth
      />
    </ListItem>
  );
});
