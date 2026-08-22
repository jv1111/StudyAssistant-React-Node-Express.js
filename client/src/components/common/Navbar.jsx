import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { List, X } from "react-bootstrap-icons";

import { logoutAPI } from "../../api/auth.api";
import { logout } from "../../redux/slice/authSlice";

function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    const response = await logoutAPI();

    if (response.success) {
      dispatch(logout());
    }
  };

  const navLinkStyles = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-white/10 text-foreground"
        : "text-muted hover:bg-white/5 hover:text-foreground"
    }`;

  const isQuizSection =
    location.pathname.startsWith("/quiz/") &&
    !location.pathname.startsWith("/quiz/create") &&
    !location.pathname.startsWith("/quiz/records");

  const quizzesActive = location.pathname === "/" || isQuizSection;

  const quizzesClassName = `
    rounded-lg px-3 py-2 text-sm font-medium transition-colors
    ${
      quizzesActive
        ? "bg-white/10 text-foreground"
        : "text-muted hover:bg-white/5 hover:text-foreground"
    }
  `;

  const handleQuizzesClick = () => {
    setIsMenuOpen(false);

    // Already inside the quiz browsing section.
    if (isQuizSection) return;
  };

  return (
    <nav className="border-b border-white/10 bg-white/[0.04] backdrop-blur-xl">
      <div className="mx-auto max-w-(--content-max-width) px-(--page-padding)">
        <div className="flex min-h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Quiz<span className="text-primary">Builder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-10 hidden items-center gap-1 md:flex">
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

          {/* Desktop Account */}
          <div className="ml-auto hidden md:block">
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground">
                Account
                <span className="text-xs transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>

              <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-white/10 bg-(--color-background-secondary)/95 p-1 shadow-(--shadow-glass) backdrop-blur-xl">
                <Link
                  to="/profile"
                  className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  Profile
                </Link>

                <div className="my-1 h-px bg-white/10" />

                <button
                  type="button"
                  onClick={logoutHandler}
                  className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-white/5 hover:text-danger"
                >
                  Logout
                </button>
              </div>
            </details>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="ml-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/10 hover:text-foreground md:hidden"
          >
            {isMenuOpen ? <X size={21} /> : <List size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {isQuizSection ? (
                <button
                  type="button"
                  className={`${quizzesClassName} text-left`}
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

              <div className="my-2 h-px bg-white/10" />

              <NavLink
                to="/profile"
                className={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>

              <button
                type="button"
                onClick={logoutHandler}
                className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-danger"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
