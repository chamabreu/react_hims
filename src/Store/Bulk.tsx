/* Imports */
import React, { useState } from "react";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import { SelectorOptions, ESelectorIDs, TSelectorOption } from './Store'
import OptionComponent from './Components/OptionComponent';



/* Component */
export default function Bulk() {
  /* States. Should get them out with useContext or useReducer */
  const [bulknumber, setBulknumber] = useState(0)
  const [description, setDescription] = useState("")
  const [client, setClient] = useState("")
  const [aID, setAID] = useState("")
  const [clientcontact, setClientcontact] = useState("")
  const [msds, setMsds] = useState(false)
  const [exprotection, setExprotection] = useState(false)
  const [weight, setWeight] = useState(0)
  const [size, setSize] = useState(0)
  const [palletcount, setPalletcount] = useState(1)
  const [archive, setArchive] = useState(false)
  const [note, setNote] = useState("")
  const [storagelocation, setStoragelocation] = useState<TSelectorOption>(SelectorOptions.testcenter)
  const [bundle, setBundle] = useState<TSelectorOption>(SelectorOptions.barrel)
  const [custombundle, setCustombundle] = useState("")
  const [wastedby, setWastedby] = useState<TSelectorOption>(SelectorOptions.clientPickup)
  const [wastedate, setWastedate] = useState("")
  const [arrivaldate, setArrivaldate] = useState("")


  /* Textfield inputs and other are handled inline */
  /* The Handle for the select inputs. Duplicate from Pallet - should be solved with a global reducer */
  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    /* Excract the id and value of the select tag */
    const { id, value } = e.target

    /* Switch the right selector */
    switch (id as ESelectorIDs) {

      /* Bulk Storage Location */
      case ESelectorIDs.bulkStorageLocation:
        setStoragelocation((prevStoragelocation: TSelectorOption): TSelectorOption => {
          return { ...prevStoragelocation, value: value }
        })
        break;


      /* Bundle Option */
      case ESelectorIDs.bundle:
        setBundle((prevStoragelocation: TSelectorOption): TSelectorOption => {
          if (value !== SelectorOptions.custom.value) {
            setCustombundle("")
          }
          return { ...prevStoragelocation, value: value }
        })
        break;


      /* Wasted By */
      case ESelectorIDs.wastedby:
        setWastedby((prevStoragelocation: TSelectorOption): TSelectorOption => {
          return { ...prevStoragelocation, value: value }
        })
        break;

      /* Default exit */
      default:
        break;
    }
  }



  /* Render */
  return (
    /* Show a nice Area for the Form */
    <Jumbotron fluid className="p-3">


      {/* The Form for Pallet  */}
      <Form>


        {/* Headline */}
        <h2><strong>New bulk solid</strong></h2>


        {/* Bulk number */}
        <Form.Group as={Row} controlId="bulksolidid">
          <Form.Label column lg={2}>Bulk solid ID</Form.Label>
          <Col>
            <Form.Control
              type="number"
              placeholder="Bulk solid ID"
              value={bulknumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setBulknumber(parseInt(e.target.value)) }}
            />
          </Col>
        </Form.Group>


        {/* Value for the Workflow */}
        <Form.Group as={Row} controlId="description">
          <Form.Label column lg={2}>Description</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* Client or Company */}
        <Form.Group as={Row} controlId="client">
          <Form.Label column lg={2}>Client</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Client/Company"
              value={client}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClient(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* Ordernumber */}
        <Form.Group as={Row} controlId="aid">
          <Form.Label column lg={2}>A-ID</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="A-ID"
              value={aID}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAID(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* Client contact, email, name, phone */}
        <Form.Group as={Row} controlId="clientcontact">
          <Form.Label column lg={2}>Client contact</Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Name or email or phone"
              value={clientcontact}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientcontact(e.target.value)}
            />
          </Col>
        </Form.Group>


        {/* MSDS Security sheet */}
        <Form.Group as={Row} controlId="msds">
          <Form.Label column lg={2}>MSDS</Form.Label>
          <Col>
            <Form.Check
              type="checkbox"
              label="Safety datasheet available"
              checked={msds}
              onChange={_ => setMsds(!msds)}
            />
          </Col>
        </Form.Group>


        {/* Explosion protection required */}
        <Form.Group as={Row} controlId="exprotection">
          <Form.Label column lg={2}>Ex-Protection</Form.Label>
          <Col>
            <Form.Check
              type="checkbox"
              label="Explosion protection required"
              checked={exprotection}
              onChange={_ => setExprotection(!exprotection)}
            />
          </Col>
        </Form.Group>



        {/* Storage location */}
        <Form.Group as={Row} controlId={ESelectorIDs.bulkStorageLocation}>
          <Form.Label column lg={2}>Storage Location</Form.Label>
          <Col>
            <Form.Control
              as="select"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectChangeHandler(e)}
              value={storagelocation.value}
            >
              <OptionComponent content={SelectorOptions.testcenter} />
              <OptionComponent content={SelectorOptions.laboratory} />
              <OptionComponent content={SelectorOptions.outsideWarehouse} />
              <OptionComponent content={SelectorOptions.testTower} />

            </Form.Control>
            <Form.Text className="text-muted">
              Storage Location TC
          </Form.Text>
          </Col>
        </Form.Group>



        {/* Bundle of the Bulk */}
        <Form.Group as={Row} controlId={ESelectorIDs.bundle}>
          <Form.Label column lg={2}>Bundle</Form.Label>
          <Col>
            <Row className="mx-0 mb-2">
              <Form.Control
                as="select"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectChangeHandler(e)}
                value={bundle.value}
              >
                <OptionComponent content={SelectorOptions.cardboard} />
                <OptionComponent content={SelectorOptions.barrel} />
                <OptionComponent content={SelectorOptions.bucket} />
                <OptionComponent content={SelectorOptions.bigBag} />
                <OptionComponent content={SelectorOptions.custom} />

              </Form.Control>
            </Row>
            {bundle.value === SelectorOptions.custom.value
              ? <Row className="mx-0">
                <Form.Control
                  type="text"
                  placeholder="Enter your custom bundle (this only should appear if 'Custom' is chosen)"
                  value={custombundle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustombundle(e.target.value)}
                />
              </Row>
              : null
            }
          </Col>
        </Form.Group>


        {/* Weight of the Bulk */}
        <Form.Group as={Row} controlId="weight">
          <Form.Label column lg={2}>Weight</Form.Label>
          <Col>
            <Form.Control
              type="number"
              placeholder="Weight in kg"
              value={weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(parseInt(e.target.value))}
            />
          </Col>
        </Form.Group>


        {/* Size of the Bulk */}
        <Form.Group as={Row} controlId="size">
          <Form.Label column lg={2}>Size</Form.Label>
          <Col>
            <Form.Control
              type="number"
              placeholder="Size in cm"
              value={size}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSize(parseInt(e.target.value))}
            />
          </Col>
        </Form.Group>


        {/* Number of Pallets */}
        <Form.Group as={Row} controlId="palletcount">
          <Form.Label column lg={2}>Pallet count</Form.Label>
          <Col>
            <Form.Control
              type="number"
              placeholder="Number of pallets"
              value={palletcount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPalletcount(parseInt(e.target.value))}
            />
          </Col>
        </Form.Group>



        {/* Date of waste */}
        <Form.Group as={Row} controlId="wasteddate">
          <Form.Label column lg={2}>Wasted on</Form.Label>
          <Col>
            <Form.Control
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWastedate(e.target.value)}
              value={wastedate}
            />
          </Col>
        </Form.Group>



        {/* Wasted by whom */}
        <Form.Group as={Row} controlId={ESelectorIDs.wastedby}>
          <Form.Label column lg={2}>Wasted by</Form.Label>
          <Col>
            <Form.Control
              as="select"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectChangeHandler(e)}
              value={wastedby.value}
            >
              <OptionComponent content={SelectorOptions.clientPickup} />
              <OptionComponent content={SelectorOptions.retoureOnOrder} />
              <OptionComponent content={SelectorOptions.referenceProduct} />
              <OptionComponent content={SelectorOptions.houseGarbage} />
              <OptionComponent content={SelectorOptions.disposalWithTC} />
              <OptionComponent content={SelectorOptions.takeAwayFieldService} />

            </Form.Control>
          </Col>
        </Form.Group>


        {/* Archive */}
        <Form.Group as={Row} controlId="archive">
          <Form.Label column lg={2}>Archive</Form.Label>
          <Col>
            <Form.Check
              type="checkbox"
              label="archived bulk"
              checked={archive}
              onChange={_ => setArchive(!archive)}
            />
          </Col>
        </Form.Group>


        {/* --------------------------------------------------------------------------------------------------------------------- */}
        {/* Document - maybe redundant? */}
        <Form.Group as={Row} controlId="document">
          <Form.Label column lg={2}>Document (Out of Order)</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Webadress" readOnly />
            <Form.Control type="text" placeholder="Comment" className="mt-1" readOnly />
          </Col>
        </Form.Group>


        {/* Arrival Date */}
        <Form.Group as={Row} controlId="arrival">
          <Form.Label column lg={2}>Bulk arrival</Form.Label>
          <Col>
            <Form.Control
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArrivaldate(e.target.value)}
              value={arrivaldate}
            />
          </Col>
        </Form.Group>


        {/* Notes textarea */}
        <Form.Group as={Row} controlId="note">
          <Form.Label column lg={2}>Note</Form.Label>
          <Col>
            <Form.Control
              as="textarea"
              placeholder="Note"
              value={note}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
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
