export type TodoListItemData = {
  id: string;
  contents: string;
};

export type TodoListData = {
  current: TodoListItemData[];
  todo: TodoListItemData[];
  done: TodoListItemData[];
};

export enum TodoListKeys {
  Current = "current",
  Todo = "todo",
  Done =  "done"
}

export enum TodoListActionType {
  CreateItem = "CREATE_ITEM",
  UpdateItem = "UPDATE_ITEM",
  MoveItem = "MOVE_ITEM",
}

export enum DraggableType {
  ListItem = "LIST_ITEM",
}

export type TodoListAction = {
  type: TodoListActionType;
  data?: any;
};

export type MoveItemPayload = { to: TodoListKeys; from: TodoListKeys; id: string };