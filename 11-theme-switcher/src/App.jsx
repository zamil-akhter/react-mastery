import "./App.css";
import Navbar from "./components/Navbar";
import ThemeButton from "./components/ThemeButton";
import { useThemeContext } from "./context/ThemeContextProvider";

function App() {
  const { theme } = useThemeContext();
  return (
    <div className={`app ${theme}`}>
      <Navbar />

      <main>
        <h1>Theme Switcher</h1>
        <ThemeButton />
      </main>
    </div>
  );
}

export default App;
