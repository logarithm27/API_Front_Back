import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavbarApp(){
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#home">Scan</Nav.Link>
                <Nav.Link href="#features">Historiques</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}