import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/system";
import React from "react";
import { arraysAreEqual } from "../helpers/arraysAreEqual";
import { theme } from "../theme";
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
  if (!arraysAreEqual(prevProps.items, nextProps.items)) return false;
  return true;
};

const TodoSubListHeader: React.FunctionComponent<{ header: string }> =
  React.memo(({ header }) => (
    <ListSubheader sx={{ bgcolor: "transparent" }}>
      <Typography>{header}</Typography>
    </ListSubheader>
  ));

const hoverColor = alpha(theme.palette.primary.main, 0.15);

export const TodoSubList: React.FunctionComponent<TodoSubListProps> =
  React.memo(function TodoSubList(props) {
    const { header, items, listKey } = props;
    const [{ isOver }, nodeRef] = useTodoSubList(listKey);

    return (
      <Paper sx={{ margin: "1em 0" }}>
        <List
          ref={nodeRef}
          sx={{
            bgcolor: isOver ? hoverColor : "transparent",
          }}
          dense
        >
          <TodoSubListHeader header={header} />
          {items.length > 0 &&
            items.map((item) => (
              <TodoListItem key={item.id} listKey={listKey} {...item} />
            ))}
        </List>
      </Paper>
    );
  }, propsAreEqual);
