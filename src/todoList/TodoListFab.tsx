import AddIcon from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/DeleteRounded";
import Fab from "@mui/material/Fab";
import { useCallback, useContext, useMemo } from "react";
import { useDrop } from "react-dnd";
import { theme } from "../theme";
import { TodoListActionsContext } from "./TodoListActionsContext";
import { DraggableType } from "./types";

export const TodoListFab = () => {
  const todoListActions = useContext(TodoListActionsContext);

  const dispatchItemCreate = useCallback(() => {
    todoListActions?.createItem();
  }, [todoListActions]);

  const handleItemDrop = useCallback((item) => {
    console.log(item);
  }, []);

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: DraggableType.ListItem,
    drop: handleItemDrop,
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  const [bgcolor, color] = useMemo(() => {
    if (isOver) {
      return [theme.palette.error.light, theme.palette.common.black];
    }

    if (canDrop) {
      return [theme.palette.error.main, theme.palette.common.black];
    }

    return [theme.palette.primary.main, theme.palette.primary.contrastText];
  }, [canDrop, isOver]);

  return (
    <Fab
      ref={dropRef}
      aria-label="add"
      sx={{
        bgcolor,
        color,
        position: "fixed",
        bottom: 24,
        right: 24,
      }}
      onClick={dispatchItemCreate}
    >
      {canDrop ? <Delete /> : <AddIcon />}
    </Fab>
  );
};
