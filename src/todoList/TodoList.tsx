import { Box } from "@mui/system";
import React from "react";
import { sortBy } from "../helpers/sortBy";
import { useTodoList } from "./hooks/useTodoList";
import { TodoListActionsContext } from "./TodoListActionsContext";
import { TodoListFab } from "./TodoListFab";
import { TodoSubList } from "./TodoSubList";
import { TodoListItemState } from "./types";

export const TodoList: React.FunctionComponent = () => {
  const [todoList, actions] = useTodoList();

  const items = sortBy(Object.values(todoList.items), "createdAt");
  const current = items.filter((i) => i.state === TodoListItemState.Current);
  const todo = items.filter((i) => i.state === TodoListItemState.Todo);
  const done = sortBy(
    items.filter((i) => i.state === TodoListItemState.Done),
    "completedAt",
    "desc"
  );

  return (
    <TodoListActionsContext.Provider value={actions}>
      <TodoSubList
        header="Current"
        listKey={TodoListItemState.Current}
        items={current}
        defaultExpanded
      />
      <TodoSubList
        header="Todo"
        listKey={TodoListItemState.Todo}
        items={todo}
        sx={{ mb: 0 }}
        defaultExpanded
      />
      <Box display="flex" justifyContent="center" mt="1rem" mb="2rem">
        <TodoListFab />
      </Box>
      <TodoSubList
        header="Done"
        listKey={TodoListItemState.Done}
        items={done}
      />
    </TodoListActionsContext.Provider>
  );
};
