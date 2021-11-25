import DragHandleIcon from "@mui/icons-material/DragHandle";
import { InputBase } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/system";
import React from "react";
import { useTodoListItem } from "./hooks/useTodoListItem";
import { TodoListItemData, TodoListKeys } from "./types";

export const TodoListItem: React.FunctionComponent<
  TodoListItemData & { listKey: TodoListKeys }
> = ({ id, listKey, contents }) => {
  const [{ isDragging }, handleRef, itemRef] = useTodoListItem(id, listKey);
  const cursor = isDragging ? "grabbing" : "grab";

  return (
    <ListItem ref={itemRef} sx={{ cursor, padding: "5px" }}>
      <Box ref={handleRef}>
        <DragHandleIcon
          fontSize="medium"
          sx={{ verticalAlign: "middle", mr: "10px", color: "text.secondary" }}
        />
      </Box>
      <InputBase fullWidth value={contents} placeholder="I need to..." />
    </ListItem>
  );
};
