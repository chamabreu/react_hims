import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";

/* 





*/



export default function Pallet() {






  return (
    <Jumbotron fluid className="p-3">
      <Form>
        <h2><strong>New Palett</strong></h2>

        <Form.Group as={Row} controlId="palletNumber">
          <Form.Label column lg={2}>Pallet Number</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Pallet Number" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="outsourced">
          <Form.Label column lg={2}>Outsourced?</Form.Label>
          <Col>
            <Form.Check type="checkbox" />
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="note">
          <Form.Label column lg={2}>Note</Form.Label>
          <Col>
            <Form.Control as="textarea" placeholder="Pallet Content" />
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


        <Form.Group as={Row} controlId="lagerort">
          <Form.Label column lg={2}>Lagerort</Form.Label>
          <Col>
            <Form.Control as="select">
              <option>Außenlager</option>
              <option>Anderes</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Wenn sie nicht Außenlager auswählen, tragen sie bitte in die Beschreibung ein, wo die Palette gelagert wird.
          </Form.Text>
          </Col>
        </Form.Group>


        <Form.Group as={Row} controlId="media">
          <Form.Label column lg={2}>Weblink</Form.Label>
          <Col>
            <Form.Control type="text" placeholder="Weblink" />
            <Form.Control type="text" placeholder="Comment" className="mt-1" />
          </Col>
        </Form.Group>

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
