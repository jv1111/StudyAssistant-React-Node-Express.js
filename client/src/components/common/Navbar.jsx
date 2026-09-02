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

  const navLinkStyles = ({ isActive }) =>
    `select-none outline-none focus:outline-none rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-200 border ${
      isActive
        ? "bg-primary-light text-primary border-primary/20 shadow-2xs"
        : "border-transparent text-muted hover:bg-background-secondary hover:text-foreground active:bg-primary-light/50"
    }`;

  const isQuizSection =
    location.pathname.startsWith("/quiz/") &&
    !location.pathname.startsWith("/quiz/create") &&
    !location.pathname.startsWith("/quiz/records");

  const quizzesActive = location.pathname === "/" || isQuizSection;

  const quizzesClassName = `
    select-none outline-none focus:outline-none rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-200 border
    ${
      quizzesActive
        ? "bg-primary-light text-primary border-primary/20 shadow-2xs"
        : "border-transparent text-muted hover:bg-background-secondary hover:text-foreground active:bg-primary-light/50"
    }
  `;

  const handleQuizzesClick = () => {
    setIsMenuOpen(false);

    if (isQuizSection) return;
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-surface/85 backdrop-blur-md select-none">
      <div className="layout-container">
        <div className="flex h-16 items-center justify-between md:justify-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-90 outline-none focus:outline-none shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary font-black text-base border border-primary/20">
              Q
            </span>

            <span>
              Quiz<span className="text-primary">Builder</span>
            </span>
          </Link>

          <div className="ml-8 hidden items-center gap-1.5 md:flex">
            {quizzesActive && isQuizSection ? (
              <button
                type="button"
                className={quizzesClassName}
                onClick={handleQuizzesClick}
              >
                Quizzes
              </button>
            ) : (
              <NavLink to="/" className={quizzesClassName}>
                Quizzes
              </NavLink>
            )}

            <NavLink to="/quiz/create" className={navLinkStyles}>
              Create quiz
            </NavLink>

            <NavLink to="/quiz/records" className={navLinkStyles}>
              Records
            </NavLink>
          </div>

          <div className="ml-auto hidden md:block">
            <details ref={accountMenuRef} className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-border bg-background-secondary px-3.5 py-1.5 text-sm font-semibold text-foreground transition-all hover:border-border-hover hover:bg-surface outline-none focus:outline-none select-none">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  A
                </div>

                <span>Account</span>

                <span className="text-[10px] text-muted transition-transform duration-200 group-open:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-surface p-1.5 shadow-(--shadow-card) animate-in fade-in zoom-in-95 duration-100">
                <Link
                  to="/profile"
                  onClick={closeAccountMenu}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary-light hover:text-primary outline-none focus:outline-none"
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
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-muted transition-colors hover:bg-danger/10 hover:text-danger outline-none focus:outline-none"
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
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-background-secondary text-foreground transition-all hover:bg-surface active:scale-95 outline-none focus:outline-none md:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-1.5">
              {isQuizSection ? (
                <button
                  type="button"
                  className={`${quizzesClassName} text-left w-full`}
                  onClick={handleQuizzesClick}
                >
                  Quizzes
                </button>
              ) : (
                <NavLink
                  to="/"
                  className={quizzesClassName}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quizzes
                </NavLink>
              )}

              <NavLink
                to="/quiz/create"
                className={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
              >
                Create quiz
              </NavLink>

              <NavLink
                to="/quiz/records"
                className={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
              >
                Records
              </NavLink>

              <div className="my-2 h-px bg-border" />

              <NavLink
                to="/profile"
                className={`${navLinkStyles({
                  isActive: location.pathname === "/profile",
                })} flex items-center gap-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Person size={16} />
                <span>Profile</span>
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  logoutHandler();
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3.5 py-2 text-left text-sm font-semibold text-muted transition-colors hover:bg-danger/10 hover:text-danger outline-none focus:outline-none"
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
