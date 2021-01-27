/* Imports */
import { Button, Col, Container, Row } from "react-bootstrap";
import { Route, Switch, useParams, Link } from "react-router-dom";
import Field from "./Field";

/* Type definitions */
/*
  IParams gets the link parameter which contains the rackposition.
  LinkExample: .../lager/A04-05-06
  A -> Shelf A
  04-05-06 -> the 3 horizontal fields that are viewed in this rack. (Maximum 12)
  Deconstructing from the URL the 3 fields on component mount
*/
interface IParams {
  rack: string
}



/* Component */
export default function Rack() {
  /* Get the rackname from the URL-Params */
  const { rack } = useParams<IParams>()
  /* Deconstruct the shelfname and the 3 horizontal fields of the Rack */
  const shelf = rack.slice(0, 1)
  const field1 = rack.slice(1, 3)
  const field2 = rack.slice(4, 6)
  const field3 = rack.slice(7, 9)



  /* Component for rackcol - this is a single field (cell) */
  function ColComponent(props: { field: string, layer: string }) {
    return (
      <Col className="p-0">
        <Link
          className="customlink
          rackcol
          d-flex
          justify-content-center
          align-items-center"
          to={`/lager/${rack}/${shelf}${props.field}.${props.layer}`}
        >
          {shelf}{props.field}.{props.layer}
        </Link>
      </Col>
    )
  }



  /* A Row in the rack (layer A-E), which contains the field components (cells) */
  function RackRowComponent(props: { layer: string }) {
    return (
      <Row className="rackrow d-flex justify-content-stretch">
        <ColComponent layer={props.layer} field={field1} />
        <ColComponent layer={props.layer} field={field2} />
        <ColComponent layer={props.layer} field={field3} />
      </Row>
    )
  }



  /* Render */
  return (
    <Switch>
      {/* Routing to a field */}
      <Route path="/lager/:rack/:field">
        <Field />
      </Route>



      {/* Routing for a Rack */}
      <Route path="/lager/:rack">
        {/* Display the Container for the Rack */}
        <Container>

          {/* Title of Rack */}
          <Row className="justify-content-center">
            <h1>Showing {rack}</h1>
          </Row>

          {/* Rack Area */}
          <Row>

            {/* Prev Rack Button */}
            <Col className="col-1 d-flex justify-content-center">
              <Button className="racknavbutton">
                {/* Showing a < symbol */}
                &lt;
              </Button>
            </Col>


            {/* Rack Creation */}
            <Col className="col-10" >
              {/* Create 5 Rows for the Rack */}
              <RackRowComponent layer="E" />
              <RackRowComponent layer="D" />
              <RackRowComponent layer="C" />
              <RackRowComponent layer="B" />
              <RackRowComponent layer="A" />
            </Col>


            {/* Next Rack Button */}
            <Col className="col-1 d-flex justify-content-center">
              <Button className="racknavbutton">
                {/* Showing a > symbol */}
                &gt;
              </Button>
            </Col>



          </Row>
        </Container>
      </Route>
    </Switch>
  )
};
