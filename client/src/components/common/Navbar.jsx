import { useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { List, X, Person, BoxArrowRight } from "react-bootstrap-icons";

import { logoutAPI } from "../../api/auth/auth.api";
import { logout } from "../../redux/slice/authSlice";

function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  const logoutHandler = async () => {
    try {
      await logoutAPI();

      dispatch(logout());
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const closeAccountMenu = () => {
    accountMenuRef.current?.removeAttribute("open");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkStyles = ({ isActive }) =>
    `select-none rounded-lg border px-3.5 py-2 text-sm font-semibold outline-none transition-all duration-200 focus:outline-none ${
      isActive
        ? "border-primary/20 bg-primary-light text-primary shadow-2xs"
        : "border-transparent text-muted hover:bg-background-secondary hover:text-foreground active:bg-primary-light/50"
    }`;

  const isProfileActive = location.pathname === "/profile";

  return (
    <nav className="sticky top-0 z-40 w-full select-none border-b border-border bg-surface/85 backdrop-blur-md">
      <div className="layout-container">
        <div className="flex h-16 items-center justify-between md:justify-start">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-foreground outline-none transition-opacity hover:opacity-90 focus:outline-none"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary-light text-base font-black text-primary">
              Q
            </span>

            <span>
              Quiz<span className="text-primary">Builder</span>
            </span>
          </Link>

          <div className="ml-8 hidden items-center gap-1.5 md:flex">
            <NavLink to="/" className={navLinkStyles}>
              Quizzes
            </NavLink>

            <NavLink to="/quiz/records" className={navLinkStyles}>
              Records
            </NavLink>

            <NavLink to="/quiz/manage" className={navLinkStyles}>
              Manage Quiz
            </NavLink>
          </div>

          <div className="ml-auto hidden md:block">
            <details ref={accountMenuRef} className="group relative">
              <summary className="flex cursor-pointer list-none select-none items-center gap-2 rounded-xl border border-border bg-background-secondary px-3.5 py-1.5 text-sm font-semibold text-foreground outline-none transition-all hover:border-border-hover hover:bg-surface focus:outline-none">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  A
                </div>

                <span>Account</span>

                <span className="text-[10px] text-muted transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="absolute right-0 top-full z-50 mt-2 w-48 animate-in rounded-xl border border-border bg-surface p-1.5 shadow-(--shadow-card) fade-in zoom-in-95 duration-100">
                <Link
                  to="/profile"
                  onClick={closeAccountMenu}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-primary-light hover:text-primary focus:outline-none"
                >
                  <Person size={16} />
                  <span>Profile</span>
                </Link>

                <div className="my-1 h-px bg-border" />

                <button
                  type="button"
                  onClick={() => {
                    closeAccountMenu();
                    logoutHandler();
                  }}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-muted outline-none transition-colors hover:bg-danger/10 hover:text-danger focus:outline-none"
                >
                  <BoxArrowRight size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </details>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-background-secondary text-foreground outline-none transition-all hover:bg-surface focus:outline-none active:scale-95 md:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-1.5">
              <NavLink to="/" className={navLinkStyles} onClick={closeMenu}>
                Quizzes
              </NavLink>

              <NavLink
                to="/quiz/records"
                className={navLinkStyles}
                onClick={closeMenu}
              >
                Records
              </NavLink>

              <NavLink
                to="/quiz/manage"
                className={navLinkStyles}
                onClick={closeMenu}
              >
                Manage Quiz
              </NavLink>

              <div className="my-2 h-px bg-border" />

              <NavLink
                to="/profile"
                className={`${navLinkStyles({
                  isActive: isProfileActive,
                })} flex items-center gap-2`}
                onClick={closeMenu}
              >
                <Person size={16} />
                <span>Profile</span>
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logoutHandler();
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3.5 py-2 text-left text-sm font-semibold text-muted outline-none transition-colors hover:bg-danger/10 hover:text-danger focus:outline-none"
              >
                <BoxArrowRight size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
