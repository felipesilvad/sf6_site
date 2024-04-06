import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Image} from 'react-bootstrap';
import {IoIosStats} from 'react-icons/io'
import {BiSolidVideos} from 'react-icons/bi'
import {AiFillTrophy} from 'react-icons/ai'
import {GiTabletopPlayers} from 'react-icons/gi'
import { useLocation } from 'react-router-dom'

function HeaderComponent() {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <Navbar className='navbar-dark' bg="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={`menu-button ${location.pathname===('/')&&('active')}`} href="/">Pals</Nav.Link>
            <Nav.Link className={`menu-button ${location.pathname===('/technology')&&('active')}`} href="/technology">Technology</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;