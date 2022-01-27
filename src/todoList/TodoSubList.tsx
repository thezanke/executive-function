import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps
} from "@mui/material/AccordionSummary";
import List from "@mui/material/List";
import { styled, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import React from "react";
import { ConnectDropTarget } from "react-dnd";
import { arraysAreEqual } from "../helpers/arraysAreEqual";
import { useTodoSubList } from "./hooks/useTodoSubList";
import { TodoListItem } from "./TodoListItem";
import { TodoListItemData, TodoListItemState } from "./types";

const Accordion = styled(
  (props: AccordionProps & { innerRef: ConnectDropTarget }) => (
    <MuiAccordion square disableGutters ref={props.innerRef} {...props} />
  )
)(() => ({
  border: "none",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
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

export const TodoSubList: React.FunctionComponent<TodoSubListProps> =
  React.memo(function TodoSubList(props) {
    const [{ isOver }, nodeRef] = useTodoSubList(props.listKey);

    return (
      <Accordion
        defaultExpanded={props.defaultExpanded}
        innerRef={nodeRef}
        disabled={isOver}
      >
        <AccordionSummary>
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
