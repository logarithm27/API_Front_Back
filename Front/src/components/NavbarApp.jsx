import { Navbar, Container } from 'react-bootstrap';

export default function NavbarApp(){
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Application Initiation</Navbar.Brand>
            </Container>
        </Navbar>
    )
}