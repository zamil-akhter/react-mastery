import "./App.css";
import Navbar from "./components/Navbar";
import ThemeButton from "./components/ThemeButton";

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <h1>Theme Switcher</h1>
        <ThemeButton />
      </main>
    </div>
  );
}

export default App;
