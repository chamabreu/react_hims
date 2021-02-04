import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBarComp() {
  return (

    <Navbar>

      <Navbar.Brand>
        <Link to="/">
          LOGO
          </Link>
      </Navbar.Brand>

      <Nav className='flex-grow-1 align-self-stretch navbutton'>
        <Link to="/lager" className='navlink'>LAGER</Link>
      </Nav>
      <Nav className='flex-grow-1 align-self-stretch navbutton'>
        <Link to="/pallet" className='navlink'>PALLET</Link>
      </Nav>
      <Nav className='flex-grow-1 align-self-stretch navbutton'>
        <Link to="/bulksolid" className='navlink'>BULK SOLID</Link>
      </Nav>
      <Nav className='flex-grow-1 align-self-stretch navbutton'>
        <Link to="/search" className='navlink'>SEARCH</Link>
      </Nav>

    </Navbar>

  )
};
