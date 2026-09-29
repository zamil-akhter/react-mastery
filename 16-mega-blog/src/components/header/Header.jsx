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
                  <button onClick={() => navigate(item.slug)} className="cursor-pointer inline-block px-4 py-2 text-sm font-medium rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
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
            <li className="ml-2">
              <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 p-1 transition-colors duration-300 focus:outline-none dark:bg-gray-700" aria-label="Toggle dark mode">
                {/* Switch knob */}
                <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${true === "dark" ? "translate-x-6" : "translate-x-0"}`}>
                  {/* SVG Icons change inside the knob */}
                  {true === "dark" ? (
                    // Moon Icon
                    <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    // Sun Icon
                    <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                    </svg>
                  )}
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
