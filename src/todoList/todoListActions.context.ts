import React from "react";
import { TodoListActions } from "./types";

export const TodoListActionsContext =
  React.createContext<TodoListActions| null>(null);