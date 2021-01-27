import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Lager from './Lager/Lager';
import whiteboard from './Assets/210125_scratch_1.jpg'
import { Container, Navbar, Nav } from 'react-bootstrap';
import Store from './Store/Store';
import Search from './Search/Search';

function App() {
  return (
    <Container>

      {/* Navbar */}
      <Navbar bg="light">

        <Navbar.Brand>
          <Link className="customlink" to="/">
            HIMS
          </Link>
        </Navbar.Brand>

        <Nav className="align-self-stretch flex-grow-1 mx-3">
          <Link to="/lager" className="customlink navlink">Lager</Link>
        </Nav>
        <Nav className="align-self-stretch flex-grow-1 mx-3">
          <Link to="/store" className="customlink navlink">Store</Link>
        </Nav>
        <Nav className="align-self-stretch flex-grow-1 mx-3">
          <Link to="/search" className="customlink navlink">Search</Link>
        </Nav>

      </Navbar>



      {/* Routing */}
      <Switch>

        {/* Sub routings if /lager are managed in Lager Component */}
        <Route path="/lager">
          <Lager />
        </Route>


        <Route path="/store">
          <Store />
        </Route>


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
