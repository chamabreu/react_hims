import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LagerRoutes from './Lager/LagerRoutes';
import whiteboard from './Assets/210125_scratch_1.jpg'
import { Container } from 'react-bootstrap';
import PalletManager from './Pallet/PalletManager';
import Search from './Search/Search';
import Bulksolid from './Bulksolid/BulkSolidForm';
import NavBarComp from './NavBarComp';

function App() {
  return (
    <Container>

      {/* Navbar */}
      <NavBarComp />



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
