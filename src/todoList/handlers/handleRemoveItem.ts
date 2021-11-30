import { Reducer } from "react";
import { TodoListAction, TodoListData, TodoListItemId } from "../types";

export const handleRemoveItem: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const id: TodoListItemId = action.data;
  const { [id]: _itemToRemove, ...items } = state.items;

  return { ...state, items };
};
