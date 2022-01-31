import List from "@mui/material/List";
import MuiPaper from "@mui/material/Paper";
import { styled, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MUIStyledCommonProps } from "@mui/system";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import React from "react";
import { arraysAreEqual } from "../helpers/arraysAreEqual";
import { useTodoSubList } from "./hooks/useTodoSubList";
import { TodoListItem } from "./TodoListItem";
import { TodoListItemData, TodoListItemState } from "./types";

const TodoListCurrentRoot = styled(MuiPaper)(
  ({ theme, isOver }: MUIStyledCommonProps<Theme> & { isOver: boolean }) => {
    return {
      borderRadius: 0,
      backgroundColor: isOver
        ? theme?.palette.action.disabledBackground
        : theme?.palette.background.paper,
    };
  }
);

const Header = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2, 0),
}));

type TodoSubListProps = {
  header: string;
  listKey: TodoListItemState;
  items: TodoListItemData[];
  sx?: SxProps<Theme>;
  defaultExpanded?: boolean;
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

export const TodoListCurrent: React.FunctionComponent<TodoSubListProps> =
  React.memo(function TodoSubList(props) {
    const [{ isOver }, nodeRef] = useTodoSubList(props.listKey);

    return (
      <TodoListCurrentRoot ref={nodeRef} isOver={isOver}>
        <Header>{props.header}</Header>
        <List dense disablePadding>
          {props.items.length > 0 &&
            props.items.map((item) => (
              <TodoListItem key={item.id} listKey={props.listKey} {...item} />
            ))}
        </List>
      </TodoListCurrentRoot>
    );
  }, propsAreEqual);
