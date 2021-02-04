/* Imports */
import React, { useReducer } from 'react'
import { Route, Switch } from "react-router-dom";
import RackRoutes from "./Rack/RackRoutes";
import Shelfs from "./Shelf/Shelfs"
import { Row, Col, Container } from "react-bootstrap";
import OnHold from "./OnHold/OnHold";
import { RackReducer, RackInitState, RackDispatchContext, RackStateContext } from './RackReducer'




/* Component */
export default function LagerRoutes() {
  /* get the reducer to use them in the .Provider in render */
  const [state, dispatch] = useReducer(RackReducer, RackInitState)


  /* RENDER */
  return (

    /* Providers for the rack context */
    <RackDispatchContext.Provider value={dispatch}>
      <RackStateContext.Provider value={state}>

        <Container>
          <Row>


            {/* On Hold */}
            <Col className="col-4">
              <OnHold />
            </Col>



            {/* Shelfs and Racks */}
            <Col className="col-8">

              <Switch>

                {/* Routing to racks */}
                <Route path="/lager/:rackName">
                  <RackRoutes />
                </Route>


                {/* Lager */}
                <Route path="/lager">
                  <Shelfs />
                </Route>


              </Switch>
            </Col>


          </Row>
        </Container>

      </RackStateContext.Provider>
    </RackDispatchContext.Provider>
  )
};
