import { Reducer } from "react";
import { storage } from "../../storage";
import { TODO_LIST_STATE_KEY } from "../constants";
import { TodoListAction, TodoListActionType, TodoListData } from "../types";
import { createItemReducer } from "./createItem.reducer";
import { updateItemReducer } from "./updateItem.reducer";
import { moveItemReducer } from "./moveItem.reducer";

const handleActionReducer: Reducer<TodoListData, TodoListAction> = (
  initialState,
  action
) => {
  switch (action.type) {
    case TodoListActionType.MoveItem: {
      return moveItemReducer(initialState, action);
    }
    case TodoListActionType.CreateItem: {
      return createItemReducer(initialState, action);
    }
    case TodoListActionType.UpdateItem: {
      return updateItemReducer(initialState, action);
    }
    default: {
      return initialState;
    }
  }
};

export const todoListReducer: Reducer<TodoListData, TodoListAction> = (
  inititalState,
  action
) => {
  const newState = handleActionReducer(inititalState, action);
  storage.write(TODO_LIST_STATE_KEY, newState);
  console.log({ action, inititalState, newState });

  return newState;
};