import { Button, Col, Container, Row } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import honey from '../../Assets/honey.jpg'

interface IParams {
  rack: string,
  field: string
}


export default function Field() {
  const { field } = useParams<IParams>()

  /* Render */
  return (
    <Container>
      <Row className="justify-content-center">
        <Button onClick={useHistory().goBack}>Back to Rack</Button>
      </Row>
      <Row>
        <h1>{field}</h1>
      </Row>
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
