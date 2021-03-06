import { Reducer } from "react";
import { v4 } from "uuid";
import { TodoListAction, TodoListData, TodoListItemState } from "../types";

export const handleCreateItem: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const id = v4();
  const newState = { ...state, items: { ...state.items } };
  newState.items[id] = {
    id,
    contents: "",
    state: TodoListItemState.Todo,
    createdAt: new Date(),
  };

  return newState;
};
