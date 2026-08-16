import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { logoutAPI } from "../api/auth.api";
import { logout } from "../redux/slice/authSlice";

function Navigation() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await logoutAPI();

    if (response.success) {
      dispatch(logout());
    }
  };

  return (
    <Navbar expand="lg" className="glass-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          Rev<span>-Bot</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navigation"
          className="navbar-toggle-custom"
        />

        <Navbar.Collapse id="main-navigation">
          <Nav className="navbar-nav-custom">
            <Nav.Link as={NavLink} to="/" className="navbar-link">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/quiz/create" className="navbar-link">
              Create quiz
            </Nav.Link>

            <Nav.Link as={NavLink} to="/quiz/records" className="navbar-link">
              Records
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <NavDropdown
              title="Account"
              id="account-dropdown"
              align="end"
              className="navbar-account"
            >
              <NavDropdown.Item as={NavLink} to="/profile">
                Profile
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item as="button" onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
