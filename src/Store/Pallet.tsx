/* Imports */
import React, { useState } from "react";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";

/* Type Definitions */
/* Options for StorageLocation Selector */
enum StorageLocation {
  other = "Other",
  outside = "Outside"
}


/* Component */
export default function Pallet() {
  /* States */
  const [palletNumber, setPalletNumber] = useState("")
  const [outsourced, setOutsourced] = useState(false)
  const [note, setNote] = useState("")
  const [storageLocation, setStorageLocation] = useState<StorageLocation>(StorageLocation.outside)
  const [webLink, setWebLink] = useState("")
  const [comment, setComment] = useState("")

  /* Actions */
  const selectStorage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorageLocation(
      e.target.value === "Other"
        ? StorageLocation.other
        : StorageLocation.outside
    )
  }


  /* Render */
  return (
    /* Show a nice Area for the Form */
    <Jumbotron fluid className="p-3">


      {/* The Form for Pallet  */}
      <Form>


        {/* Headline */}
        <h2><strong>New Palett</strong></h2>


        {/* Pallet Number */}
        <Form.Group as={Row} controlId="palletNumber">
          <Form.Label column lg={2}>Pallet Number</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Pallet Number"
              value={palletNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPalletNumber(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* Outsourced option */}
        <Form.Group as={Row} controlId="outsourced">
          <Form.Label column lg={2}>Outsourced?</Form.Label>
          <Col>
            <Form.Check
              type="checkbox"
              checked={outsourced}
              onChange={_ => setOutsourced(!outsourced)}
            />
          </Col>
        </Form.Group>


        {/* Notes textarea */}
        <Form.Group as={Row} controlId="note">
          <Form.Label column lg={2}>Note</Form.Label>
          <Col>
            <Form.Control
              as="textarea"
              placeholder="Pallet Content"
              value={note}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* A Selector to choose where a Pallet should be placed.
This is commented out, because the "placing" maybe is solved with
a waiting list and drag and drop */}
        {/* 
          <Form.Group as={Row} controlId="lagerplatzAussenlager">
            <Form.Label column lg={2}>Lagerplatz Außenlager</Form.Label>
            <Col>
              <Form.Control as="select">
                <option>A01.A</option>
                <option>A01.B</option>
                <option>A01.C</option>
                <option>A01.D</option>
                <option>A01.E</option>
                <option>A02.A</option>
                <option>A02.B</option>
                <option>A02.C</option>
                <option>A02.D</option>
                <option>A02.E</option>
                <option>A03.A</option>
                <option>A03.B</option>
                <option>A03.C</option>
                <option>A03.D</option>
                <option>A03.E</option>
                <option>A04.A</option>
                <option>A04.B</option>
                <option>A04.C</option>
                <option>A04.D</option>
                <option>A04.E</option>
              </Form.Control>
            </Col>
          </Form.Group>
        */}

        {/* Which storage is used */}
        <Form.Group as={Row} controlId="storagelocation">
          <Form.Label column lg={2}>Storage Location</Form.Label>
          <Col>
            <Form.Control
              as="select"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectStorage(e)}
              value={storageLocation}
            >
              <option>Outside</option>
              <option>Other</option>
            </Form.Control>
            <Form.Text className="text-muted">
              If you don't choose Outside, please enter in the Notes where it is stored.
            </Form.Text>
          </Col>
        </Form.Group>


        {/* Link to media - maybe not needed with this webapp */}
        <Form.Group as={Row} controlId="media">
          <Form.Label column lg={2}>Weblink</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Webadress"
              value={webLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebLink(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Comment"
              className="mt-1"
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* Buttons */}
        <Row>

          {/* Add to waiting list to place the Pallet with drag and drop in the rack */}
          <Col>
            <Button variant="primary" block>
              Add to waiting list
            </Button>
          </Col>


          {/* Reset the Form */}
          <Col>
            <Row className="mb-2">
              <Button variant="danger" type="reset" block>
                Reset Content
              </Button>

            </Row>

          </Col>
        </Row>


      </Form>

    </Jumbotron>
  )
};
