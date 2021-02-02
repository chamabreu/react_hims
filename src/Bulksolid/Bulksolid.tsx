/* Imports */
import React, { useEffect, useReducer, useState } from "react";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import BulkSolidFields from './BulkSolidFields'
import axios from 'axios';


/* Define Reducer Dispatch handler */
const BulkSolidReducer = (state: BulkSolidState, action: BulkSolidActions) => {
  switch (action.type) {
    case 'textField':
      return { ...state, [action.fieldID]: action.payload }

    case 'checkBox':
      return { ...state, [action.fieldID]: action.payload }

    case 'bulksolidid':
      return { ...state, bulkSolidID: action.payload }


    case 'resetform':
      return { ...BulkSolidInitState }

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
  /* set bulkdSolidID number */
  | { type: 'bulksolidid', payload: number }
  /* reset the form */
  | { type: 'resetform' }
/* more can be added */



/* Types of Bulk solid form inputs */
export type BulkSolidState = {
  bulkSolidID: number,
  aID: string,
  arrivalDate: string,
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
  bulkSolidID: -1,
  aID: "",
  arrivalDate: "",
  bulkSolidShape: "",
  casNumber: "",
  density: "",
  description: "",
  enteredBy: "",
  exprotection: false,
  msds: false,
  msdsFile: "in progress",
  note: "",
  pictureFile: "in progress",
}



/* Export State and Dispatch Context to call it with useContext()*/
export const BulkSolidStateContext = React.createContext<BulkSolidState>(BulkSolidInitState)
export const BulkSolidDispatchContext = React.createContext<React.Dispatch<BulkSolidActions>>(() => { })




/* Component Bulk solid form page */
export default function Bulksolid() {

  /* Global state of the form handled by reducer and context */
  const [state, dispatch] = useReducer(BulkSolidReducer, BulkSolidInitState)
  const [isLoading, setIsLoading] = useState(false)
  const [apiMessage, setApiMessage] = useState("")


  useEffect(() => {
    if (state.bulkSolidID === -1) {

      console.warn("RERENDERING BULKDSOLIDFORM")
      axios.get("http://localhost:5000/store/newbulksolidid")
        .then((response) => {
          /* response.data contains a lastCounterValue which is the last bulksolidid which was registered */
          /* Set the new bulksolidid to the lastCounterValue + 1 */
          dispatch({ type: "bulksolidid", payload: response.data.lastCounterValue + 1 })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [state.bulkSolidID])


  /* Submit */
  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setApiMessage("")


    axios.post('http://localhost:5000/store/bulksolid', { ...state })
      .then(response => {
        console.log(response.data)
        setApiMessage("Saved")
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setApiMessage("Error")
        setIsLoading(false)
      })
  }


  if (!isLoading && (apiMessage === "")) {

    /* Render */
    return (
      /* Show a nice Area for the Form */
      <Jumbotron fluid className="p-3">


        {/* The Form for Pallet  */}
        <Form onSubmit={submitData}>


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


  } else {
    return (

      <Jumbotron fluid className="p-3">
        {isLoading
          ? "Loading..."
          :
          <>
            <div>
              {apiMessage}
            </div>
            <Button onClick={_ => {
              dispatch({ type: "resetform" })
              setApiMessage("")
            }}>Back</Button>
          </>
        }
      </Jumbotron>
    )

  }
};
