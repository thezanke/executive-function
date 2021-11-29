import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTodoSubList } from "./hooks/useTodoSubList";
import { TodoListItem } from "./TodoListItem";
import { TodoListItemState } from "./types";

type TodoSubListProps = {
  header: string;
  listKey: TodoListItemState;
  items: any[];
};

const propsAreEqual = (
  prevProps: TodoSubListProps,
  nextProps: TodoSubListProps
) => {
  if (prevProps.header !== nextProps.header) return false;
  if (prevProps.listKey !== nextProps.listKey) return false;
  if (prevProps.items.length !== nextProps.items.length) return false;
  let s = new Set([...prevProps.items, ...nextProps.items]);
  if (s.size !== prevProps.items.length) return false;
  return true;
};

export const TodoSubList: React.FunctionComponent<TodoSubListProps> =
  React.memo((props) => {
    const { header, items, listKey } = props;
    const [{ isOver }, nodeRef] = useTodoSubList(listKey);

    return (
      <Paper sx={{ margin: "1em 0" }}>
        <List
          ref={nodeRef}
          sx={{
            bgcolor: isOver ? "rgba(255,255,150,0.1)" : "transparent",
          }}
        >
          <ListSubheader sx={{ bgcolor: "transparent" }}>
            <Typography>{header}</Typography>
          </ListSubheader>
          {items.length > 0 &&
            items.map((item) => (
              <TodoListItem key={item.id} listKey={listKey} {...item} />
            ))}
        </List>
      </Paper>
    );
  }, propsAreEqual);
