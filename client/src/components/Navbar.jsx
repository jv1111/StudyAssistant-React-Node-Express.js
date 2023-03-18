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
        <Navbar bg="light" expand="lg">
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
                            <NavDropdown.Item as={Link} to="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler} to="#action/3.4">
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