/* Imports */
import { useState } from "react";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";


/* Type Definitions */
/* 

storagelocation select options
  Hall
  Laboratory
  Outside
  TestTower

bundle select options (with custom text)
  Cardboard
  Barrel
  Bucket
  BigBag
  Custom

wastedate date
wastedby select options
  Client Pickup
  Retoure on Order 
  Reference product
  House garbage
  Disposal with TC
  Take away field service

document 2 textfields?!
arrival date


*/


/* Component */
export default function Bulk() {
const [bulknumber, setBulknumber] = useState("")
const [value, setValue] = useState("")
const [client, setClient] = useState("")
const [ordernumber, setOrdernumber] = useState("")
const [clientcontact, setClientcontact] = useState("")
const [msds, setMsds] = useState(false)
const [exprotection, setExprotection] = useState(false)
const [weight, setWeight] = useState("")
const [size, setSize] = useState("")
const [palletcount, setPalletcount] = useState("")
const [archive, setArchive] = useState(false)
const [note, setNote] = useState("")




  /* Render */
  return (
    /* Show a nice Area for the Form */
    <Jumbotron fluid className="p-3">


      {/* The Form for Pallet  */}
      <Form>


        {/* Headline */}
        <h2><strong>New Bulk</strong></h2>


        {/* Bulk number */}
        <Form.Group as={Row} controlId="bulknumber">
          <Form.Label column lg={2}># number</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Bulk number" />
          </Col>
        </Form.Group>


        {/* Value for the Workflow */}
        <Form.Group as={Row} controlId="value">
          <Form.Label column lg={2}>Value</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="name of value, used within the workflow" />
          </Col>
        </Form.Group>


        {/* Client or Company */}
        <Form.Group as={Row} controlId="client">
          <Form.Label column lg={2}>Client</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Client/Company" />
          </Col>
        </Form.Group>


        {/* Ordernumber */}
        <Form.Group as={Row} controlId="ordernumber">
          <Form.Label column lg={2}>Ordernumber</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Ordernumber" />
          </Col>
        </Form.Group>


        {/* Client contact, email, name, phone */}
        <Form.Group as={Row} controlId="clientcontact">
          <Form.Label column lg={2}>Clientcontact</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Enter Name or emailadress" />
          </Col>
        </Form.Group>


        {/* MSDS Security sheet */}
        <Form.Group as={Row} controlId="msds">
          <Form.Label column lg={2}>MSDS</Form.Label>
          <Col>
            <Form.Check type="checkbox" label="Securitypage present" />
          </Col>
        </Form.Group>


        {/* Explosion protection required */}
        <Form.Group as={Row} controlId="exprotection">
          <Form.Label column lg={2}>Ex-Protection</Form.Label>
          <Col>
            <Form.Check type="checkbox" label="Explosion protection required" />
          </Col>
        </Form.Group>


        {/* Storage location */}
        <Form.Group as={Row} controlId="storagelocation">
          <Form.Label column lg={2}>Storage Location</Form.Label>
          <Col>
            <Form.Control as="select">
              <option>Hall</option>
              <option>Laboratory</option>
              <option>Outside</option>
              <option>TestTower</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Storage Location TC
          </Form.Text>
          </Col>
        </Form.Group>


        {/* Bundle of the Bulk */}
        <Form.Group as={Row} controlId="bundle">
          <Form.Label column lg={2}>Bundle</Form.Label>
          <Col>
            <Row className="mx-0 mb-2">
              <Form.Control as="select">
                <option>Cardboard</option>
                <option>Barrel</option>
                <option>Bucket</option>
                <option>BigBag</option>
                <option>Custom</option>
              </Form.Control>
            </Row>
            <Row className="mx-0">
              <Form.Control type="text" placeholder="Enter your custom bundle (this only should appear if 'Custom' is chosen)" />
            </Row>
          </Col>
        </Form.Group>


        {/* Weight of the Bulk */}
        <Form.Group as={Row} controlId="weight">
          <Form.Label column lg={2}>Weight</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Weight in kg" />
          </Col>
        </Form.Group>


        {/* Size of the Bulk */}
        <Form.Group as={Row} controlId="size">
          <Form.Label column lg={2}>Size</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Size in cm" />
          </Col>
        </Form.Group>


        {/* Number of Pallets */}
        <Form.Group as={Row} controlId="palletcount">
          <Form.Label column lg={2}>Pallet count</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Number of pallets" />
          </Col>
        </Form.Group>


        {/* Date of waste */}
        <Form.Group as={Row} controlId="wasteddate">
          <Form.Label column lg={2}>Wasted on</Form.Label>
          <Col>
            <Form.Control type="date" />
          </Col>
        </Form.Group>


        {/* Wasted by whom */}
        <Form.Group as={Row} controlId="wastedby">
          <Form.Label column lg={2}>Wasted by</Form.Label>
          <Col>
            <Form.Control as="select">
              <option>Client Pickup</option>
              <option>Retoure on Order </option>
              <option>Reference product</option>
              <option>House garbage</option>
              <option>Disposal with TC</option>
              <option>Take away field service</option>
            </Form.Control>
          </Col>
        </Form.Group>


        {/* Archive */}
        <Form.Group as={Row} controlId="archive">
          <Form.Label column lg={2}>Archive</Form.Label>
          <Col>
            <Form.Check type="checkbox" label="archived bulk" />
          </Col>
        </Form.Group>


        {/* Document - maybe redundant? */}
        <Form.Group as={Row} controlId="document">
          <Form.Label column lg={2}>Document</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Webadress" />
            <Form.Control type="text" placeholder="Comment" className="mt-1" />
          </Col>
        </Form.Group>


        {/* Arrival Date */}
        <Form.Group as={Row} controlId="arrival">
          <Form.Label column lg={2}>Bulk arrival</Form.Label>
          <Col>
            <Form.Control type="date" />
          </Col>
        </Form.Group>


        {/* Notes textarea */}
        <Form.Group as={Row} controlId="note">
          <Form.Label column lg={2}>Note</Form.Label>
          <Col>
            <Form.Control as="textarea" placeholder="Note" />
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
