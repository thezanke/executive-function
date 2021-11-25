import { Reducer } from "react";
import { v4 } from "uuid";
import { TodoListAction, TodoListData, TodoListItemData, TodoListKeys } from "../types";

export const createItemReducer: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const newItem: TodoListItemData = { id: v4(), contents: '' };
  
  return { ...state, [TodoListKeys.Todo]: [newItem, ...state[TodoListKeys.Todo]] }
};