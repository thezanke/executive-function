import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useCallback, useContext } from "react";
import { DispatchContext } from "./dispatch.context";
import { TodoListActionType } from "./types";

export const TodoListFab = () => {
  const dispatch = useContext(DispatchContext);

  const dispatchItemCreate = useCallback(() => {
    if (!dispatch) return;

    dispatch({ type: TodoListActionType.CreateItem });
  }, [dispatch]);

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
