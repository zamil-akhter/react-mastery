import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-300 py-3 flex justify-center gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default NavBar;
