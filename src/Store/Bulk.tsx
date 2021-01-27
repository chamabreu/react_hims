import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";

export default function Bulk() {
  return (
    <Jumbotron fluid className="p-3">
      <Form>
        <h2><strong>New Bulk</strong></h2>

        <Form.Group as={Row} controlId="bulknumber">
          <Form.Label column lg={2}># number</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Bulk number" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="value">
          <Form.Label column lg={2}>Value</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="name of value, used within the workflow" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="client">
          <Form.Label column lg={2}>Client</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Client/Company" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="ordernumber">
          <Form.Label column lg={2}>Ordernumber</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Ordernumber" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="clientcontact">
          <Form.Label column lg={2}>Clientcontact</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Enter Name or emailadress" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="msds">
          <Form.Label column lg={2}>MSDS</Form.Label>
          <Col>
            <Form.Check type="checkbox" label="Securitypage present" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="exprotection">
          <Form.Label column lg={2}>Ex-Protection</Form.Label>
          <Col>
            <Form.Check type="checkbox" label="Explosion protection required" />
          </Col>
        </Form.Group>


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


        <Form.Group as={Row} controlId="weight">
          <Form.Label column lg={2}>Weight</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Weight in kg" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="size">
          <Form.Label column lg={2}>Size</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Size in cm" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="palletcount">
          <Form.Label column lg={2}>Pallet count</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Number of pallets" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="wasteddate">
          <Form.Label column lg={2}>Wasted on</Form.Label>
          <Col>
            <Form.Control type="date" />
          </Col>
        </Form.Group>




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


        <Form.Group as={Row} controlId="archive">
          <Form.Label column lg={2}>Archive</Form.Label>
          <Col>
            <Form.Check type="checkbox" label="archived bulk" />
          </Col>
        </Form.Group>



        <Form.Group as={Row} controlId="document">
          <Form.Label column lg={2}>Document</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Webadress" />
            <Form.Control type="text" placeholder="Comment" className="mt-1" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="arrival">
          <Form.Label column lg={2}>Bulk arrival</Form.Label>
          <Col>
            <Form.Control type="date" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="note">
          <Form.Label column lg={2}>Note</Form.Label>
          <Col>
            <Form.Control as="textarea" placeholder="Note" />
          </Col>
        </Form.Group>

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


        <Row>
          <Col>
            <Button variant="primary" block>
              Add to waiting list
            </Button>
          </Col>


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
