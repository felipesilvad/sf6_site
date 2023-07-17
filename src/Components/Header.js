import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Image} from 'react-bootstrap';
import {IoIosStats} from 'react-icons/io'
import {BiSolidVideos} from 'react-icons/bi'
import {AiFillTrophy} from 'react-icons/ai'
import {GiTabletopPlayers} from 'react-icons/gi'
import logo from '../Assets/img/logo.png'

function HeaderComponent() {
  const navDropdownTitle = (<>STATS <IoIosStats /></>);

  return (
    <Navbar className='navbar-dark' bg="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <Image className='main-logo' src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='ardela menu-button' href="/vods">Vods <BiSolidVideos /></Nav.Link>
            <NavDropdown className='ardela menu-button' title={navDropdownTitle} id="basic-nav-dropdown">
              <NavDropdown.Item className='menu-button' href="/stats/matchup-chart">Matchup Chart</NavDropdown.Item>
              <NavDropdown.Item className='menu-button' href="/stats/chars-usage">Character Usage</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='ardela menu-button' href="/players">Players <GiTabletopPlayers /></Nav.Link>
            <Nav.Link className='ardela menu-button text-muted' href="/tournaments" disabled>Tournaments <AiFillTrophy /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;