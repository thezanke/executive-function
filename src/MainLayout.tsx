import Container from "@mui/material/Container";
import { Logo } from "./Logo";
import { TodoList } from "./todoList/TodoList";

export const MainLayout = () => {
  return (
    <Container maxWidth="sm">
      <Logo />
      <TodoList />
    </Container>
  );
};
