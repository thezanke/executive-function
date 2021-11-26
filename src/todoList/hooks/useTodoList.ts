import { useMemo, useReducer } from "react";
import { storage } from "../../storage";
import { TODO_LIST_STATE_KEY } from "../constants";
import { todoListReducer } from "../reducers/todoList.reducer";
import {
  MoveItemPayload,
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

export const useTodoList = (): [TodoListData, TodoListActions] => {
  const [todoListState, dispatch] = useReducer(
    todoListReducer,
    initialTodoList
  );

  const actions = useMemo(
    () => ({
      moveItem(payload: MoveItemPayload) {
        const item = todoListState.items[payload.id];

        if (payload.to === item.state) return;

        if (item.state === TodoListItemState.Done) {
          if (
            !window.confirm("Are you sure you want to un-complete this item?")
          ) {
            return;
          }
        }

        if (payload.to === TodoListItemState.Current) {
          const currentItem = Object.values(todoListState.items).find(
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
      createItem() {
        const existingEmptyTodo = Object.values(todoListState.items).find(
          (i) => i.state === TodoListItemState.Todo && !i.contents.trim().length
        );

        if (existingEmptyTodo) return;
        
        dispatch({ type: TodoListActionType.CreateItem });
      },
      updateItem(payload: UpdateItemPayload) {
        dispatch({
          type: TodoListActionType.UpdateItem,
          data: payload,
        });
      },
    }),
    [todoListState, dispatch]
  );

  return [todoListState, actions];
};
