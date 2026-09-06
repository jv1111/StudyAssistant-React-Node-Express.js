import { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  List,
  X,
  Person,
  BoxArrowRight,
  JournalBookmark,
  Gear,
} from "react-bootstrap-icons";

import { logoutAPI } from "../../api/auth/auth.api";
import { logout } from "../../redux/slice/authSlice";

function Navigation() {
  const dispatch = useDispatch();
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
    `flex items-center gap-3 select-none rounded-xl border px-3.5 py-2.5 text-sm font-semibold outline-none transition-all duration-200 focus:outline-none ${
      isActive
        ? "border-primary/20 bg-primary-light text-primary shadow-2xs"
        : "border-transparent text-muted hover:bg-background-secondary hover:text-foreground active:bg-primary-light/50"
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-border bg-surface md:flex md:flex-col">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground outline-none transition-opacity hover:opacity-90 focus:outline-none"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary-light text-base font-black text-primary">
              Q
            </span>

            <span>
              Study<span className="text-primary title-3d">Assistant</span>
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-1 flex-col px-3 py-5">
          <div className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-muted">
            Navigation
          </div>

          <nav className="flex flex-col gap-1.5">
            <NavLink to="/" className={navLinkStyles}>
              <JournalBookmark size={18} />
              <span>Quizzes</span>
            </NavLink>

            <NavLink to="/quiz/records" className={navLinkStyles}>
              <JournalBookmark size={18} />
              <span>Records</span>
            </NavLink>

            <NavLink to="/quiz/manage" className={navLinkStyles}>
              <Gear size={18} />
              <span>Manage Quiz</span>
            </NavLink>
          </nav>
        </div>

        {/* Account Section */}
        <div className="shrink-0 border-t border-border p-3">
          <details ref={accountMenuRef} className="group relative">
            <summary className="flex cursor-pointer list-none select-none items-center gap-3 rounded-xl border border-border bg-background-secondary px-3 py-2.5 text-sm font-semibold text-foreground outline-none transition-all hover:border-border-hover hover:bg-surface focus:outline-none">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                A
              </div>

              <span className="flex-1">Account</span>

              <span className="text-[10px] text-muted transition-transform duration-200 group-open:rotate-180">
                ▼
              </span>
            </summary>

            <div className="absolute bottom-full left-0 right-0 z-50 mb-2 animate-in rounded-xl border border-border bg-surface p-1.5 shadow-(--shadow-card) fade-in zoom-in-95 duration-100">
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
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-foreground outline-none transition-opacity hover:opacity-90 focus:outline-none"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary-light text-base font-black text-primary">
              Q
            </span>

            <span>
              Study<span className="text-primary title-3d">Assistant</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-background-secondary text-foreground outline-none transition-all hover:bg-surface focus:outline-none active:scale-95"
          >
            {isMenuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-background/80 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Full-height Menu */}
          <div className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-border bg-surface px-4 py-5 shadow-lg md:hidden">
            <nav className="flex min-h-full flex-col gap-1.5">
              <NavLink to="/" className={navLinkStyles} onClick={closeMenu}>
                <JournalBookmark size={18} />
                <span>Quizzes</span>
              </NavLink>

              <NavLink
                to="/quiz/records"
                className={navLinkStyles}
                onClick={closeMenu}
              >
                <JournalBookmark size={18} />
                <span>Records</span>
              </NavLink>

              <NavLink
                to="/quiz/manage"
                className={navLinkStyles}
                onClick={closeMenu}
              >
                <Gear size={18} />
                <span>Manage Quiz</span>
              </NavLink>

              <div className="my-2 h-px bg-border" />

              <NavLink
                to="/profile"
                className={navLinkStyles}
                onClick={closeMenu}
              >
                <Person size={18} />
                <span>Profile</span>
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logoutHandler();
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3.5 py-2.5 text-left text-sm font-semibold text-muted outline-none transition-colors hover:bg-danger/10 hover:text-danger focus:outline-none"
              >
                <BoxArrowRight size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default Navigation;
