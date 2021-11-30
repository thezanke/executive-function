import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { emphasize } from "@mui/system/colorManipulator";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import React, { useMemo } from "react";
import { arraysAreEqual } from "../helpers/arraysAreEqual";
import { theme } from "../theme";
import { useTodoSubList } from "./hooks/useTodoSubList";
import { TodoListItem } from "./TodoListItem";
import { TodoListItemData, TodoListItemState } from "./types";

type TodoSubListProps = {
  header: string;
  listKey: TodoListItemState;
  items: TodoListItemData[];
  dense?: boolean;
  sx?: SxProps<Theme>;
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

const defaultBgcolor = theme.palette.grey[900];
const hoverColor = emphasize(defaultBgcolor, 0.05);

export const TodoSubList: React.FunctionComponent<TodoSubListProps> =
  React.memo(function TodoSubList(props) {
    const [{ isOver }, nodeRef] = useTodoSubList(props.listKey);

    const bgcolor = useMemo(
      () => (isOver ? hoverColor : defaultBgcolor),
      [isOver]
    );

    return (
      <Paper sx={{ margin: "1em 0", position: "relative", ...props.sx }}>
        <List ref={nodeRef} sx={{ bgcolor }} dense={props.dense}>
          <ListSubheader sx={{ bgcolor }}>
            <Typography>{props.header}</Typography>
          </ListSubheader>
          {props.items.length > 0 &&
            props.items.map((item) => (
              <TodoListItem key={item.id} listKey={props.listKey} {...item} />
            ))}
        </List>
      </Paper>
    );
  }, propsAreEqual);
