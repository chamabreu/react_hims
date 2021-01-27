/* Imports */
import { Button, Col, Container, Row } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import honey from '../../Assets/honey.jpg'

/* Type definitions */
/*
  IParams gets the link parameter which contains the rackposition.
  LinkExample: .../lager/:rack/A05.D
  for :rack look Rack.tsx
  A -> Shelf A
  05 -> the horizontal field of a rack. (Maximum 12)
  .D -> the layer of the rack (could be A-E)
*/
interface IParams {
  rack: string,
  field: string
}


/* Component */
export default function Field() {
  /* Deconstructing the field from URL-Params */
  const { field } = useParams<IParams>()



  /* Render */
  return (
    /* The Field Container */
    <Container>

      {/* Button to go back to Rack */}
      <Row className="justify-content-center">
        <Button onClick={useHistory().goBack}>Back to Rack</Button>
      </Row>


      {/* Name of the Field */}
      <Row>
        <h1>{field}</h1>
      </Row>


      {/* More Details of the field contents */}
      {/* Placed dummy data for example. Needs to get build further. */}
      <Row>
        <Col>
          <img className="fieldimage" src={honey} alt="honeypic" />
        </Col>


        <Col>
          <h3>Honey</h3>
          <p>In Stock: 2</p>
        </Col>


        <Col className="d-flex flex-column justify-content-around">
          <Button>Store</Button>
          <Button>Take</Button>
          <Button>Move</Button>
        </Col>

      </Row>

    </Container>
  )
};
