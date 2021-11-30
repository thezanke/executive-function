import Container from "@mui/material/Container";
import { Logo } from "./Logo";
import { TodoList } from "./todoList/TodoList";

export const MainLayout = () => {
  return (
    <Container maxWidth="sm" sx={{ pb: 1 }}>
      <Logo />
      <TodoList />
    </Container>
  );
};
