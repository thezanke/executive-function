import { Reducer } from "react";
import {
  MoveItemPayload,
  TodoListAction,
  TodoListData,
  TodoListItemState,
} from "../types";

export const handleMoveItem: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const { to, id }: MoveItemPayload = action.data;
  const from = state.items[id].state;

  const newState = { ...state };

  newState.items[id] = {
    ...state.items[id],
    state: to,
  };

  if (to === TodoListItemState.Done) {
    newState.items[id].completedAt = new Date();
  }

  if (from === TodoListItemState.Done) {
    delete newState.items[id].completedAt;
  }

  return newState;
};
