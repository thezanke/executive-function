export type TodoListItemId = string;

export enum TodoListItemState {
  Current = "current",
  Todo = "todo",
  Done = "done",
}

export type TodoListItemData = {
  id: TodoListItemId;
  contents: string;
  state: TodoListItemState;
};

export type TodoListData = {
  items: {
    [key: TodoListItemId]: TodoListItemData;
  };
};

export enum TodoListActionType {
  CreateItem = "CREATE_ITEM",
  UpdateItem = "UPDATE_ITEM",
  MoveItem = "MOVE_ITEM",
  RemoveItem = "REMOVE_ITEM",
}

export enum DraggableType {
  ListItem = "LIST_ITEM",
}

export type TodoListAction = {
  type: TodoListActionType;
  data?: any;
};

export type MoveItemPayload = {
  to: TodoListItemState;
  id: TodoListItemId;
};

export type UpdateItemPayload = { id: TodoListItemId; value: string };

export type TodoListActions = {
  moveItem: (payload: MoveItemPayload) => void;
  createItem: () => void;
  updateItem: (payload: UpdateItemPayload) => void;
  removeItem: (payload: TodoListItemId) => void;
};
