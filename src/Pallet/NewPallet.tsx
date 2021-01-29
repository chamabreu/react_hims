/* Imports */
import React, { useState } from "react";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import { SelectorOptions, TSelectorOption, ESelectorIDs } from '../Interfaces/Interfaces';
import OptionComponent from '../Components/OptionComponent';
// import axios from 'axios'

/* Component */
export default function NewPallet() {
  /* States */
  const [palletID, setPalletID] = useState("")
  const [releasedFromStock, setReleasedFromStock] = useState(false)
  const [note, setNote] = useState("")
  const [storageLocation, setStorageLocation] = useState<TSelectorOption>(SelectorOptions.outsideWarehouse)
  // const [webLink, setWebLink] = useState("")
  // const [comment, setComment] = useState("")
  const [enteredBy, setEnteredBy] = useState("")


  /* Textfield inputs and other are handled inline */
  /* The Handle for the select inputs. */
  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    /* Excract the id and value of the select tag */
    const { id, value } = e.target


    /* Switch the right selector */
    switch (id as ESelectorIDs) {

      /* Pallet Storage Location */
      case ESelectorIDs.palletStorageLocation:
        setStorageLocation((prevStorageLocation: TSelectorOption): TSelectorOption => {
          return { ...prevStorageLocation, value: value }
        })
        break;


      /* Exit */
      default:
        break;
    }
  }


  /* Submit */
  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Out of Function ;-)")
    // axios.post('http://localhost:5000/store/pallet', {
    //   palletID,
    //   releasedFromStock,
    //   note,
    //   storageLocation: storageLocation.value,
    //   enteredBy,
    // })
    //   .then(response => {
    //     console.log(response.data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }


  /* Render */
  return (
    /* Show a nice Area for the Form */
    <Jumbotron fluid className="p-3">


      {/* The Form for Pallet  */}
      <Form onSubmit={e => submitData(e)} >


        {/* Headline */}
        <h2><strong>New Palett</strong></h2>


        {/* Pallet Number */}
        <Form.Group as={Row} controlId="palletID">
          <Form.Label column lg={2}>Pallet ID</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Pallet ID"
              value={palletID}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPalletID(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* Outsourced option */}
        <Form.Group as={Row} controlId="releasedFromStock">
          <Form.Label column lg={2}>Released from Stock</Form.Label>
          <Col>
            <Form.Check
              type="checkbox"
              checked={releasedFromStock}
              onChange={_ => setReleasedFromStock(!releasedFromStock)}
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
        <Form.Group as={Row} controlId={ESelectorIDs.palletStorageLocation}>
          <Form.Label column lg={2}>Storage Location</Form.Label>
          <Col>
            <Form.Control
              as="select"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectChangeHandler(e)}
              value={storageLocation.value}
            >
              <OptionComponent content={SelectorOptions.outsideWarehouse} />
              <OptionComponent content={SelectorOptions.other} />

            </Form.Control>
            <Form.Text className="text-muted">
              If you choose other, please add a note where the pallet is stored.
            </Form.Text>
          </Col>
        </Form.Group>


        {/* Link to media - maybe not needed with this webapp */}
        <Form.Group as={Row} controlId="media">
          <Form.Label column lg={2}>Weblink (out of order)</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Webadress"
              // value={webLink}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebLink(e.target.value)}
              readOnly
            />
            <Form.Control
              type="text"
              placeholder="Comment"
              className="mt-1"
              // value={comment}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
              readOnly
            />
          </Col>
        </Form.Group>


        {/* Editor Name enteredBy */}
        <Form.Group as={Row} controlId="enteredBy">
          <Form.Label column lg={2}>Your Name</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Your Name"
              value={enteredBy}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnteredBy(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* Buttons */}
        <Row>

          {/* Add to waiting list to place the Pallet with drag and drop in the rack */}
          <Col>
            <Button variant="primary" type="submit" block>
              Add to waiting list
            </Button>
          </Col>


        </Row>


      </Form>

    </Jumbotron>
  )
};
