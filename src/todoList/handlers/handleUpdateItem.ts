import { Reducer } from "react";
import { TodoListAction, TodoListData, UpdateItemPayload } from "../types";

export const handleUpdateItem: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const newState = { ...state };
  const { id, value }: UpdateItemPayload = action.data;
  newState.items[id] = { ...state.items[id], contents: value };

  return newState;
};
