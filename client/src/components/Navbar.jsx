import { Link } from "react-router-dom"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { logoutAPI } from "../api/AuthApi";
import { logout } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

function Navigation() {

    const dispatch = useDispatch();
    const logoutHandler = () => {
        logoutAPI();
        dispatch(logout());
    }

    return (
        <Navbar expand="lg" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">Rev-Bot</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/quiz/create">Create quiz</Nav.Link>
                        <Nav.Link as={Link} to="/quiz/records">Records</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        <NavDropdown title="Account" id="basic-nav-dropdown" align="end">
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as="button" className="w-100 text-start" onClick={logoutHandler}>
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
