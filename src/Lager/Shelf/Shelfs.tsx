/* Imports */
import { Col, Row } from "react-bootstrap";
import Shelf from "./Shelf";


/* Component */
export default function Shelfs() {


  /* RENDER */
  return (
    <>
      <Row>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h1>Shelfs</h1>
          <p>Select one to show the containing racks</p>
        </Col>
      </Row>
      <Row>
        <Shelf shelfname="A" />
        <Shelf shelfname="B" />
        <Shelf shelfname="C" />
      </Row>
    </>

  )
};
