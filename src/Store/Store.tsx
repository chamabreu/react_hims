/* Imports */
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Bulk from "./Bulk";
import Pallet from "./Pallet";



export enum ESelectorIDs {
  palletStorageLocation = "palletStorageLocation",
  bulkStorageLocation = "bulkStorageLocation",
  bundle = "bundle",
  wastedBy = "wastedBy",
}

export type TSelectorOption = {
  text: string,
  value: string
}


export const SelectorOptions = {
  get testCenter() {
    return ({text: "TestCenter", value: "testCenter"})
  },
  get laboratory() {
    return ({text: "Laboratory", value: "laboratory"})
  },
  get outsideWarehouse() {
    return ({text: "Outside Warehouse", value: "outsideWarehouse"})
  },
  get testTower() {
    return ({text: "TestTower", value: "testTower"})
  },
  get cardBoard() {
    return ({text: "Cardboard", value: "cardBoard"})
  },
  get barrel() {
    return ({text: "Barrel", value: "barrel"})
  },
  get bucket() {
    return ({text: "Bucket", value: "bucket"})
  },
  get bigBag() {
    return ({text: "BigBag", value: "bigBag"})
  },
  get custom() {
    return ({text: "Custom", value: "custom"})
  },
  get clientPickup() {
    return ({text: "Client Pickup", value: "clientPickup"})
  },
  get retoureOnOrder() {
    return ({text: "Retoure on Order ", value: "retoureOnOrder"})
  },
  get referenceProduct() {
    return ({text: "Reference product", value: "referenceProduct"})
  },
  get houseGarbage() {
    return ({text: "House garbage", value: "houseGarbage"})
  },
  get disposalWithTC() {
    return ({text: "Disposal with TC", value: "disposalWithTC"})
  },
  get takeAwayFieldService() {
    return ({text: "Take away field service", value: "takeAwayFieldService"})
  },
  get other() {
    return ({text: "Other", value: "other"})
  },
}


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
