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
      {/* END */}



      {/* Routing */}
      <Switch>

        <Route path="/lager">
          <Lager />
        </Route>

        <Route path="/">
          <h1>Home</h1>
          <p>The Scratchwall for the Project</p>
          <img src={whiteboard} alt="Whiteboard" width="100%" />
        </Route>

      </Switch>
      {/* END */}


    </Container>
  );
}

export default App;
