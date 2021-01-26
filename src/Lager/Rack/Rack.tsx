import { Button, Col, Container, Row } from "react-bootstrap";
import { Route, Switch, useParams, Link } from "react-router-dom";
import Field from "./Field";

interface IParams {
  rack: string
}

export default function Rack() {
  const { rack } = useParams<IParams>()
  const shelf = rack.slice(0, 1)
  const field1 = rack.slice(1, 3)
  const field2 = rack.slice(4, 6)
  const field3 = rack.slice(7, 9)



  /* Custom Component for rackcol */
  function ColComponent(props: { field: string, layer: string }) {
    return (
      <Col className="p-0">
        <Link className="rackcol d-flex justify-content-center align-items-center" style={{ textDecoration: "none" }} to={`/lager/${rack}/${shelf}${props.layer}${props.field}`}>
          {shelf}{props.layer}{props.field}
        </Link>
      </Col>
    )
  }

  /* Custom Link Wrapper for the rackrows */
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
      {/* Routing */}
      <Route path="/lager/:rack/:field">
        <Field />
      </Route>


      {/* Rack */}
      <Route path="/lager/:rack">
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
                &lt;
              </Button>
            </Col>


            {/* Rack Creation */}
            <Col className="col-10" >
              {/* Create 5 Rows for the Rack */}
              <RackRowComponent layer="e" />
              <RackRowComponent layer="d" />
              <RackRowComponent layer="c" />
              <RackRowComponent layer="b" />
              <RackRowComponent layer="a" />
            </Col>


            {/* Next Rack Button */}
            <Col className="col-1 d-flex justify-content-center">
              <Button className="racknavbutton">
                &gt;
              </Button>
            </Col>



          </Row>
        </Container>
      </Route>
    </Switch>
  )
};
