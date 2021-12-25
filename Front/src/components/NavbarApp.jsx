import { Navbar, Container, Nav } from 'react-bootstrap';
import React from 'react';

export default function NavbarApp(){
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home">Accueil</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/scan">Scan</Nav.Link>
                <Nav.Link href="/historic">Historiques</Nav.Link>
                <Nav.Link href="/category">Catégories</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}