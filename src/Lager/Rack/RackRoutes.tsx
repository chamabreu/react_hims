/* Imports */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Rack from "./Rack";




/* Component */
export default function RackRoutes() {


  /* Render */
  return (
    /* Provide the dispatch and the state in 2 different contexts */

    <Switch>


      {/* Routing for a Rack */}
      <Route path="/lager/:rackName">
        <Rack />
      </Route>


    </Switch>

  )

};
