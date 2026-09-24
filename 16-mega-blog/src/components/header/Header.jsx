import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "My Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <Container>
        <nav className="flex items-center">
          <div className="mr-6">
            <Link to="/" className="inline-block transition-transform duration-200 hover:scale-105">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex items-center gap-1.5 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.slug}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="cursor-pointer inline-block px-4 py-2 text-sm font-medium rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
