import { Container, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Rack from "./Rack/Rack";
import Shelf from "./Shelf";



export default function Lager() {
  return (
    <Switch>
      {/* Routing */}
      <Route path="/lager/:rack">
        <Rack />
      </Route>
      {/* END */}


      {/* Render Lager */}
      <Route path="/lager">
        <Container>
          select a rack to jump in
          <Row className="justify-content-center">
            <Shelf shelfname="A" />
            <Shelf shelfname="B" />
            <Shelf shelfname="C" />
          </Row>

        </Container>
      </Route>
      {/* END */}


    </Switch>
  )
};
