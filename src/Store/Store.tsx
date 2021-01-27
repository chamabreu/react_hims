import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Bulk from "./Bulk";
import Pallet from "./Pallet";




export default function Store() {
  const [showPallet, setShowPallet] = useState(true)


  return (
    <Container>
      <Row className="mt-2 mb-3 productswitchrow">
        <Col className="d-flex justify-content-center">
          <Button onClick={_ => setShowPallet(true)} variant="outline-primary" block active={showPallet} >
            Pallet
          </Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button onClick={_ => setShowPallet(false)} variant="outline-primary" block active={!showPallet} >
            Bulk
          </Button>
        </Col>
      </Row>
      {showPallet
        ? <Pallet />
        : <Bulk />
      }
    </Container>
  )
};
