import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../pages/Provider/AuthProvider";
import axios from "axios";

function Header() {
  const [logoutMessage, setLogoutMessage] = useState([]);
  const { user, setUser,setLoading } = useContext(AuthContext);

  const handleLogout = () => {
    axios({
      method: "post",
      url: "https://user-management-server-hazel.vercel.app/logout",
      withCredentials: true,
    }).then((res) => {
      if (res.data?.message) {
        setUser(null);
        setLoading(false);
        setLogoutMessage(res.data.message);
        alert(logoutMessage);
      }
    });
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">User Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Link</Nav.Link>
          </Nav>
          <div className="btns d-flex gap-2">
            {!user && (
              <a href="/signup">
                <Button variant="success">Sign Up</Button>
              </a>
            )}
            {!user && (
              <a href="/login">
                <Button variant="success">Log In</Button>
              </a>
            )}
            {user && (
              <a href="/">
                <Button onClick={handleLogout} variant="danger">
                  Logout
                </Button>
              </a>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
