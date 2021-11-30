import { Reducer, useCallback, useMemo, useReducer } from "react";
import { storage } from "../../storage";
import { TODO_LIST_STATE_KEY } from "../constants";
import { handleCreateItem } from "../handlers/handleCreateItem";
import { handleMoveItem } from "../handlers/handleMoveItem";
import { handleUpdateItem } from "../handlers/handleUpdateItem";
import { handleRemoveItem } from "../handlers/handleRemoveItem";
import {
  MoveItemPayload,
  TodoListAction,
  TodoListActions,
  TodoListActionType,
  TodoListData,
  TodoListItemId,
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
  [TodoListActionType.RemoveItem]: handleRemoveItem,
};

export const todoListReducer: Reducer<TodoListData, TodoListAction> = (
  prevState,
  action
) => {
  const newState =
    actionHandlers[action.type]?.(prevState, action) ?? prevState;

  storage.write(TODO_LIST_STATE_KEY, newState);

  console.log({ ...action, prevState, newState });

  return newState;
};

export const useTodoList = (): [TodoListData, TodoListActions] => {
  const [state, dispatch] = useReducer(todoListReducer, initialTodoList);

  const actions: Partial<TodoListActions> = useMemo(() => ({}), []);

  actions.moveItem = useCallback(
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

  actions.createItem = useCallback(() => {
    const existingEmptyTodo = Object.values(state.items).find(
      (i) => i.state === TodoListItemState.Todo && !i.contents.trim().length
    );

    if (existingEmptyTodo) return;

    dispatch({ type: TodoListActionType.CreateItem });
  }, [state.items, dispatch]);

  actions.updateItem = useCallback(
    (payload: UpdateItemPayload) => {
      dispatch({
        type: TodoListActionType.UpdateItem,
        data: payload,
      });
    },
    [dispatch]
  );

  actions.removeItem = useCallback(
    (payload: TodoListItemId) => {
      dispatch({
        type: TodoListActionType.RemoveItem,
        data: payload,
      });
    },
    [dispatch]
  );

  return [state, actions as TodoListActions];
};
