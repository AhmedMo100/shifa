import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-no-bg.png";

const Header = () => {
    return (
        <Navbar expand="lg" className="shifa-navbar">
            <Container>
                <Navbar.Brand href="/" className="shifa-logo">
                    <img src={Logo} alt="شِفا" className="logo-img" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="shifa-navbar" />
                <Navbar.Collapse id="shifa-navbar">
                    <Nav className="m-auto shifa-nav">
                        <Nav.Link as={Link} to="/about">حولنا</Nav.Link>
                        <Nav.Link as={Link} to="/services">خدماتنا</Nav.Link>
                        <Nav.Link as={Link} to="/blog">مدونتنا</Nav.Link>
                    </Nav>
                    <Button className="shifa-contact-btn" href="tel:01000000000">
                        تواصل معنا
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
