import { Reducer } from "react";
import { TodoListAction, TodoListActionType, TodoListData } from "../types";
import { createItemReducer } from "./createItem.reducer";
import { moveItemReducer } from "./moveItem.reducer";

export const todoListReducer: Reducer<TodoListData, TodoListAction> = (
  state,
  action
) => {
  console.log(action);
  switch (action.type) {
    case TodoListActionType.MoveItem: {
      return moveItemReducer(state, action);
    }
    case TodoListActionType.CreateItem: {
      return createItemReducer(state, action);
    }
    default: {
      return state;
    }
  }
};