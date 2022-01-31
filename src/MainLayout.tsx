import Container from "@mui/material/Container";
import { TodoList } from "./todoList/TodoList";

export const MainLayout = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <TodoList />
    </Container>
  );
};
