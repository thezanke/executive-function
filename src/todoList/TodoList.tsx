import React, { useReducer } from "react";
import { v4 } from "uuid";
import { DispatchContext } from "./dispatch.context";
import { todoListReducer } from "./reducers/todoList.reducer";
import { TodoListFab } from "./TodoListFab";
import { TodoSubList } from "./TodoSubList";
import { TodoListData, TodoListKeys } from "./types";

const initialTodoList: TodoListData = {
  current: [],
  todo: [
    { id: v4(), contents: "Aliquid quis qui quod corrupti totam assumends." },
    { id: v4(), contents: "Ipsam maxime ea doloribus nemo nobis sed hic und." },
    { id: v4(), contents: "Esse nostrum pariatur omnis libero qui." },
    { id: v4(), contents: "Ut numquam debitis laudantium." },
  ],
  done: [],
};

export const TodoList: React.FunctionComponent = () => {
  const [todoList, dispatch] = useReducer(todoListReducer, initialTodoList);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodoSubList
        header="Current"
        listKey={TodoListKeys.Current}
        items={todoList.current}
      />
      <TodoSubList
        header="Todo"
        listKey={TodoListKeys.Todo}
        items={todoList.todo}
      />
      <TodoSubList
        header="Done"
        listKey={TodoListKeys.Done}
        items={todoList.done}
      />
      <TodoListFab />
    </DispatchContext.Provider>
  );
};
