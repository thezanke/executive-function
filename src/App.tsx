import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MainLayout } from "./MainLayout";
import { theme } from "./theme";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DndProvider backend={HTML5Backend}>
          <MainLayout />
        </DndProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
