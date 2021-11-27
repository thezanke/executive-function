import { Reducer } from "react";
import { MoveItemPayload, TodoListAction, TodoListData } from "../types";

export const handleMoveItem: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const { to, id }: MoveItemPayload = action.data;
  const newState = { ...state };
  newState.items[id] = {
    ...state.items[id],
    state: to,
  };

  return newState;
};
