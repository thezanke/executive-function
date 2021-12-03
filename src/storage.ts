import {
  TodoListData,
  TodoListItemData,
  TodoListItemState,
} from "./todoList/types";

const reviveItem = (parsedItem: any): TodoListItemData => {
  const createdAt = parsedItem.createdAt
    ? new Date(parsedItem.createdAt)
    : new Date();

  const item = { ...parsedItem, createdAt };
  if (parsedItem.completedAt) {
    item.completedAt = new Date(parsedItem.completedAt);
  } else if (parsedItem.state === TodoListItemState.Done) {
    item.completedAt = new Date();
  }

  return item;
};

const reviveState = (parsedState: any): TodoListData | null => {
  if (!parsedState) return parsedState;

  const items = (parsedState.items ?? {}) as Record<string, any>;
  Object.entries(items).forEach(([id, item]) => {
    items[id] = reviveItem(item);
  });

  let state: TodoListData = { ...parsedState, items };

  return state;
};

export const storage = {
  read(key: string) {
    const rawState = localStorage.getItem(key);
    if (!rawState) return null;
    return reviveState(JSON.parse(rawState));
  },

  write(key: string, state: { [key: string]: any }) {
    localStorage.setItem(key, JSON.stringify(state));
  },
};
