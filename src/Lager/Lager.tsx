/* Imports */
import { Container, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Rack from "./Rack/Rack";
import Shelf from "./Shelf";


/* Component */
export default function Lager() {


  /* RENDER */
  return (
    <Switch>

      {/* Routing to racks */}
      <Route path="/lager/:rack">
        <Rack />
      </Route>


      {/* Lager */}
      <Route path="/lager">
        <Container>
          select a rack to jump in


          {/* Shelfs */}
          <Row>
            <Shelf shelfname="A" />
            <Shelf shelfname="B" />
            <Shelf shelfname="C" />
          </Row>


        </Container>
      </Route>


    </Switch>
  )
};
