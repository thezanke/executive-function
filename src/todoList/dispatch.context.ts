import React, { Dispatch } from "react";
import { TodoListAction } from "./types";

export const DispatchContext =
  React.createContext<Dispatch<TodoListAction> | null>(null);