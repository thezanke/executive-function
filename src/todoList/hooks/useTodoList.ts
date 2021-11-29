import { Reducer, useCallback, useReducer, useRef } from "react";
import { storage } from "../../storage";
import { TODO_LIST_STATE_KEY } from "../constants";
import { handleCreateItem } from "../handlers/handleCreateItem";
import { handleMoveItem } from "../handlers/handleMoveItem";
import { handleUpdateItem } from "../handlers/handleUpdateItem";
import {
  MoveItemPayload,
  TodoListAction,
  TodoListActions,
  TodoListActionType,
  TodoListData,
  TodoListItemState,
  UpdateItemPayload,
} from "../types";

const initialTodoList: TodoListData = {
  items: {},
  ...storage.read(TODO_LIST_STATE_KEY),
};

const actionHandlers = {
  [TodoListActionType.MoveItem]: handleMoveItem,
  [TodoListActionType.CreateItem]: handleCreateItem,
  [TodoListActionType.UpdateItem]: handleUpdateItem,
};

export const todoListReducer: Reducer<TodoListData, TodoListAction> = (
  prevState,
  action
) => {
  const nextState =
    actionHandlers[action.type]?.(prevState, action) ?? prevState;

  storage.write(TODO_LIST_STATE_KEY, nextState);

  console.log({ ...action, initialState: prevState, newState: nextState });

  return nextState;
};

export const useTodoList = (): [
  TodoListData,
  React.MutableRefObject<TodoListActions>
] => {
  const [state, dispatch] = useReducer(todoListReducer, initialTodoList);

  const moveItem = useCallback(
    (payload: MoveItemPayload) => {
      const item = state.items[payload.id];

      if (payload.to === item.state) return;

      if (item.state === TodoListItemState.Done) {
        const confirmed = window.confirm(
          "Are you sure you want to un-complete this item?"
        );

        if (!confirmed) return;
      }

      if (payload.to === TodoListItemState.Current) {
        const currentItem = Object.values(state.items).find(
          (i) => i.state === TodoListItemState.Current
        );

        if (currentItem) {
          dispatch({
            type: TodoListActionType.MoveItem,
            data: { id: currentItem.id, to: TodoListItemState.Todo },
          });
        }
      }

      dispatch({
        type: TodoListActionType.MoveItem,
        data: payload,
      });
    },
    [state.items, dispatch]
  );

  const createItem = useCallback(() => {
    const existingEmptyTodo = Object.values(state.items).find(
      (i) => i.state === TodoListItemState.Todo && !i.contents.trim().length
    );

    if (existingEmptyTodo) return;

    dispatch({ type: TodoListActionType.CreateItem });
  }, [state.items, dispatch]);

  const updateItem = useCallback(
    (payload: UpdateItemPayload) => {
      dispatch({
        type: TodoListActionType.UpdateItem,
        data: payload,
      });
    },
    [dispatch]
  );

  const actions = useRef({ moveItem, createItem, updateItem });

  return [state, actions];
};
