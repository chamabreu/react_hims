import { Col, Container, Row } from "react-bootstrap";
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
      <Col>
        <Link className="rackcol d-flex justify-content-center align-items-center" style={{ textDecoration: "none" }} to={`/lager/${rack}/${shelf}${props.layer}${props.field}`}>
          {shelf}{props.layer}{props.field}
        </Link>
      </Col>
    )
  }

  /* Custom Link Wrapper for the rackrows */
  function RowComponent(props: { layer: string }) {
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
          <h1>Showing {rack}</h1>
          <RowComponent layer="e" />
          <RowComponent layer="d" />
          <RowComponent layer="c" />
          <RowComponent layer="b" />
          <RowComponent layer="a" />
        </Container>
      </Route>
    </Switch>
  )
};
