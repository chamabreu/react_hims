import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Lager from './Lager/Lager';
import whiteboard from './Assets/210125_scratch_1.jpg'
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Container>

      {/* Navbar */}
      <Navbar bg="light" expand="lg">

        <Navbar.Brand href="/">HIMS</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="/lager">Lager</Nav.Link>
        </Nav>

      </Navbar>



      {/* Routing */}
      <Switch>

        {/* Sub routings if /lager are managed in Lager Component */}
        <Route path="/lager">
          <Lager />
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
