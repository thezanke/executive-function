import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import React, { useCallback, useContext } from "react";
import { TodoListActionsContext } from "./TodoListActionsContext";

export const TodoListFab = () => {
  const todoListActions = useContext(TodoListActionsContext);

  const dispatchItemCreate = useCallback(() => {
    todoListActions?.createItem();
  }, [todoListActions]);

  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "absolute",
        bottom: 50,
        right: 50,
      }}
      onClick={dispatchItemCreate}
    >
      <AddIcon />
    </Fab>
  );
};
