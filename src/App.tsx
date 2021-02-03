import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import LagerRoutes from './Lager/LagerRoutes';
import whiteboard from './Assets/210125_scratch_1.jpg'
import { Container, Navbar, Nav } from 'react-bootstrap';
import PalletManager from './Pallet/PalletManager';
import Search from './Search/Search';
import Bulksolid from './Bulksolid/BulkSolidForm';

function App() {
  return (
    <Container>

      {/* Navbar */}
      <Navbar bg="light">

        <Navbar.Brand>
          <Link to="/">
            HIMS
          </Link>
        </Navbar.Brand>

        <Nav className='flex-grow-1 align-self-stretch navbutton'>
          <Link to="/lager" className='navlink'>Lager</Link>
        </Nav>
        <Nav className='flex-grow-1 align-self-stretch navbutton'>
          <Link to="/pallet" className='navlink'>Pallet</Link>
        </Nav>
        <Nav className='flex-grow-1 align-self-stretch navbutton'>
          <Link to="/bulksolid" className='navlink'>Bulk Solid</Link>
        </Nav>
        <Nav className='flex-grow-1 align-self-stretch navbutton'>
          <Link to="/search" className='navlink'>Search</Link>
        </Nav>

      </Navbar>



      {/* Routing */}
      <Switch>

        {/* Sub routings if /lager are managed in Lager Component */}
        <Route path="/lager">
          <LagerRoutes />
        </Route>

        {/* Pallet management */}
        <Route path="/pallet">
          <PalletManager />
        </Route>
        
        {/* Bulksolid management */}
        <Route path="/bulksolid">
          <Bulksolid />
        </Route>

        {/* Searchpage to search items */}
        <Route path="/search">
          <Search />
        </Route>

        {/* Home Path */}
        <Route path="/">
          <h1>Home</h1>
          <p>The Scratchwall for the Project</p>
          <img src={whiteboard} alt="Whiteboard" width="100%" />
        </Route>


      </Switch>
    </Container>
  );
}

export default App;
