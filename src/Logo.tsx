import Typography from "@mui/material/Typography";
import { theme } from "./theme";

export const Logo = () => {
  return (
    <Typography
      variant="h3"
      my={5}
      color={theme.palette.primary.light}
      align="center"
      fontFamily="'M PLUS 1 Code', sans-serif;"
    >
      ExecutiveFn();
    </Typography>
  );
};
