import { Reducer } from "react";
import { v4 } from "uuid";
import { TodoListAction, TodoListData, TodoListItemState } from "../types";

export const createItemReducer: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const id = v4();
  const newState = { ...state };
  newState.items[id] = {
    id,
    contents: "",
    state: TodoListItemState.Todo,
  };

  return newState;
};
