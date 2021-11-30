import AddIcon from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/DeleteRounded";
import Fab from "@mui/material/Fab";
import { emphasize } from "@mui/system/colorManipulator";
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
    todoListActions?.removeItem(item.id);
  }, [todoListActions]);

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: DraggableType.ListItem,
    drop: handleItemDrop,
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  const colors = useMemo(() => {
    if (isOver) {
      return {
        bgcolor: emphasize(theme.palette.error.main, .333),
        color: theme.palette.common.black,
      };
    }

    if (canDrop) {
      return {
        bgcolor: theme.palette.error.main,
        color: theme.palette.common.black,
      };
    }
  }, [canDrop, isOver]);

  return (
    <Fab
      ref={dropRef}
      aria-label="add"
      variant="extended"
      size="medium"
      color="primary"
      sx={{ ...colors, zIndex: 1 }}
      onClick={dispatchItemCreate}
    >
      {canDrop ? (
        <>
          <Delete /> Remove
        </>
      ) : (
        <>
          <AddIcon /> New
        </>
      )}
    </Fab>
  );
};
