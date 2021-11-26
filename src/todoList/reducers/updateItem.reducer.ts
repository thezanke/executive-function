import { Reducer } from "react";
import { TodoListAction, TodoListData, UpdateItemPayload } from "../types";

export const updateItemReducer: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const { id, value }: UpdateItemPayload = action.data;
  
  const newState = { ...state };
  newState.items[id] = { ...state.items[id], contents: value };

  return newState;
};