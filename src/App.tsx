import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import { isMobile } from "react-device-detect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MainLayout } from "./MainLayout";
import { theme } from "./theme";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <MainLayout />
        </DndProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
