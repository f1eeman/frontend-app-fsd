import { AppRouter } from "./routing/App.Router";
import { ThemeProvider } from "./theme/Provider";
import "./styles/index.scss";

export const App = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};
