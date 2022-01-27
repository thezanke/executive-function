import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import List from "@mui/material/List";
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

const defaultBgcolor = theme.palette.background.paper;
const hoverColor = emphasize(defaultBgcolor, 0.05);

export const TodoSubList: React.FunctionComponent<TodoSubListProps> =
  React.memo(function TodoSubList(props) {
    const [{ isOver }, nodeRef] = useTodoSubList(props.listKey);

    const bgcolor = useMemo(
      () => (isOver ? hoverColor : defaultBgcolor),
      [isOver]
    );

    return (
      <Accordion
        defaultExpanded={props.defaultExpanded}
        ref={nodeRef}
        sx={{ bgcolor }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{props.header}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <List dense disablePadding>
            {props.items.length > 0 &&
              props.items.map((item) => (
                <TodoListItem key={item.id} listKey={props.listKey} {...item} />
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }, propsAreEqual);
