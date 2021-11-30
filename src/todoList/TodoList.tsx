import React from "react";
import { useTodoList } from "./hooks/useTodoList";
import { TodoListActionsContext } from "./TodoListActionsContext";
import { TodoListFab } from "./TodoListFab";
import { TodoSubList } from "./TodoSubList";
import { TodoListItemState } from "./types";

export const TodoList: React.FunctionComponent = () => {
  const [todoList, actions] = useTodoList();

  const items = Object.values(todoList.items).reverse();
  const current = items.filter((i) => i.state === TodoListItemState.Current);
  const todo = items.filter((i) => i.state === TodoListItemState.Todo);
  const done = items.filter((i) => i.state === TodoListItemState.Done);

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
      />
      <TodoSubList
        header="Done"
        listKey={TodoListItemState.Done}
        items={done}
      />
      <TodoListFab />
    </TodoListActionsContext.Provider>
  );
};
