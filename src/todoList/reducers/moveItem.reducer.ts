import { Reducer } from "react";
import { MoveItemPayload, TodoListAction, TodoListData, TodoListItemData, TodoListKeys } from "../types";

export const moveItemReducer: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  const { to, from, id }: MoveItemPayload = action.data;
  if (to === from) return state;

  if (
    from === TodoListKeys.Done &&
    !window.confirm("Are you sure you want to uncomplete this item?")
  ) {
    return state;
  }

  const newState = { ...state };
  const fromArray = state[from] as TodoListItemData[];
  const currentItem = fromArray.find((i) => i.id === id) as TodoListItemData;
  newState[from] = fromArray.filter((i) => i.id !== id);

  const toArray = state[to] as TodoListItemData[];
  newState[to] = [currentItem];

  if (to === TodoListKeys.Current && toArray.length) {
    newState.todo = [...toArray, ...newState.todo];
  } else {
    newState[to].push(...toArray);
  }

  return newState;
};