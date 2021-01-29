/* Imports */
import React, { useReducer } from "react";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import BulkSolidFields from './BulkSolidFields'



/* Define Reducer Dispatch handler */
const BulkSolidReducer = (state: BulkSolidState, action: BulkSolidActions) => {
  switch (action.type) {
    case 'textField':
      return { ...state, [action.fieldID]: action.payload }

    case 'checkBox':
      return { ...state, [action.fieldID]: action.payload }

    default:
      return state
  }
}

/* Define actions for the dispatcher */
type BulkSolidActions =
  /* type textfield expects a payload string */
  | { type: 'textField', fieldID: string, payload: string }
  /* type checkbox expects a payload boolean */
  | { type: 'checkBox', fieldID: string, payload: boolean }
/* more can be added */



/* Types of Bulk solid form inputs */
type BulkSolidState = {
  aID: string,
  arrivalDate: string,
  bulkSolidID: number,
  bulkSolidShape: string,
  casNumber: string,
  density: string,
  description: string,
  enteredBy: string,
  exprotection: boolean,
  msds: boolean,
  msdsFile: string,
  note: string,
  pictureFile: string

}


/* Initial values for Bulk solid inputs */
const BulkSolidInitState = {
  aID: "",
  arrivalDate: "",
  bulkSolidID: 0,
  bulkSolidShape: "",
  casNumber: "",
  density: "",
  description: "",
  enteredBy: "",
  exprotection: false,
  msds: false,
  msdsFile: "",
  note: "",
  pictureFile: "",
}



/* Export State and Dispatch Context to call it with useContext()*/
export const BulkSolidStateContext = React.createContext<BulkSolidState>(BulkSolidInitState)
export const BulkSolidDispatchContext = React.createContext<React.Dispatch<BulkSolidActions>>(() => { })




/* Component Bulk solid form page */
export default function Bulksolid() {
  
  /* Global state of the form handled by reducer and context */
  const [state, dispatch] = useReducer(BulkSolidReducer, BulkSolidInitState)



  /* Render */
  return (
    /* Show a nice Area for the Form */
    <Jumbotron fluid className="p-3">


      {/* The Form for Pallet  */}
      <Form>


        {/* Headline */}
        <h2 style={{ textAlign: "center" }}><strong>New bulk solid</strong></h2>


        {/* Input Components handled by context and reducer */}
        <BulkSolidDispatchContext.Provider value={dispatch}>
          <BulkSolidStateContext.Provider value={state}>


            {/* Outsourced Fields */}
            <BulkSolidFields />


          </BulkSolidStateContext.Provider>
        </BulkSolidDispatchContext.Provider>


        {/* Buttons */}
        <Row>
          {/* Create a new Bulk solid item and set it to the waitlist */}
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
