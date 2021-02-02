/* Imports */
import { Route, Switch } from "react-router-dom";
import RackRoutes from "./Rack/RackRoutes";
import Shelfs from "./Shelfs"
import { Row, Col, Container } from "react-bootstrap";
import OnHold from "./OnHold/OnHold";


/* Component */
export default function LagerRoutes() {


  /* RENDER */
  return (
    <>
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
    </>
  )
};
