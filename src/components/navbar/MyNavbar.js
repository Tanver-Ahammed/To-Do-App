import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom';

const MyNavbar = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>
                        <NavLink className="text-decoration-none text-gray me-3 text-white" to="/">TODO</NavLink>
                        <NavLink className="text-decoration-none text-gray me-3" to="/about">About</NavLink>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default MyNavbar;