/* Imports */
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Bulk from "./Bulk";
import Pallet from "./Pallet";



/* Component */
export default function Store() {
  /* State to switch between "Add Pallet" and "Add Bulk" view */
  const [showPallet, setShowPallet] = useState(true)



  /* Render */
  return (


    <Container>

      {/* Buttons to switch between Pallet/Bulk view */}
      <Row className="mt-2 mb-3 productswitchrow">
        {/* Pallet Button */}
        <Col className="d-flex justify-content-center">
          <Button
            variant="outline-primary"
            block
            active={showPallet}
            onClick={_ => setShowPallet(true)}
          >
            Pallet
          </Button>
        </Col>

        {/* Bulk Button */}
        <Col className="d-flex justify-content-center">
          <Button
            variant="outline-primary"
            block
            active={!showPallet}
            onClick={_ => setShowPallet(false)}
          >
            Bulk
          </Button>
        </Col>
      </Row>


      {/* Conditionally render Pallet or Bulk Form */}
      {showPallet
        ? <Pallet />
        : <Bulk />
      }


    </Container>
  )
};
