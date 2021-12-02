import { Box } from "@mui/system";
import React from "react";
import { useTodoList } from "./hooks/useTodoList";
import { TodoListActionsContext } from "./TodoListActionsContext";
import { TodoListFab } from "./TodoListFab";
import { TodoSubList } from "./TodoSubList";
import { TodoListItemState } from "./types";

function sortBy<T>(
  arr: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return arr.sort((a: Record<keyof T, any>, b: Record<keyof T, any>) => {
    const asc = direction === "asc";
    if (a[key] > b[key]) return asc ? 1 : -1;
    if (a[key] < b[key]) return asc ? -1 : 1;
    return 0;
  });
}

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
      />
      <TodoSubList
        header="Todo"
        listKey={TodoListItemState.Todo}
        items={todo}
        sx={{ mb: 0 }}
        dense
      />
      <Box display="flex" justifyContent="center" mt="1rem" mb="2rem">
        <TodoListFab />
      </Box>
      <TodoSubList
        header="Done"
        listKey={TodoListItemState.Done}
        items={done}
        dense
      />
    </TodoListActionsContext.Provider>
  );
};
