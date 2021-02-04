/* Imports */
import React, { useEffect, useReducer, useState } from "react";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import BulkSolidFields from './BulkSolidFields'
import axios from 'axios';


/* Define Reducer Dispatch handler */
const BulkSolidReducer = (state: TBulkSolid, action: TBulkSolidActions) => {
  switch (action.type) {
    case 'textField':
      return { ...state, [action.fieldID]: action.payload }

    case 'pictureUpload':
      return { ...state, [action.fieldID]: action.payload }

    case 'msdsUpload':
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
type TBulkSolidActions =
  /* type textfield expects a payload string */
  | { type: 'textField', fieldID: string, payload: string }
  /* type pictureUpload expects a file */
  | { type: 'pictureUpload', fieldID: string, payload?: File }
  /* type msdsUpload expects a file */
  | { type: 'msdsUpload', fieldID: string, payload?: File }
  /* type checkbox expects a payload boolean */
  | { type: 'checkBox', fieldID: string, payload: boolean }
  /* set bulkdSolidID number */
  | { type: 'bulksolidid', payload: number }
  /* reset the form */
  | { type: 'resetform' }
/* more can be added */



/* Types of Bulk solid form inputs */
export type TBulkSolid = {
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
  msdsFile?: File,
  note: string,
  pictureFile?: File,
  onHold: boolean,

}


/* Initial values for Bulk solid inputs */
const BulkSolidInitState = {
  bulkSolidID: -1,
  aID: "",
  arrivalDate: "2020-12-24",
  bulkSolidShape: "",
  casNumber: "",
  density: "",
  description: "D",
  enteredBy: "jmb",
  exprotection: false,
  msds: false,
  msdsFile: undefined,
  note: "D",
  pictureFile: undefined,
  onHold: false
}



/* Export State and Dispatch Context to call it with useContext()*/
export const BulkSolidFormStateContext = React.createContext<TBulkSolid>(BulkSolidInitState)
export const BulkSolidFormDispatchContext = React.createContext<React.Dispatch<TBulkSolidActions>>(() => { })




/* Component Bulk solid form page */
export default function Bulksolid() {

  /* Global state of the form handled by reducer and context */
  const [state, dispatch] = useReducer(BulkSolidReducer, BulkSolidInitState)

  /* local states for user feedback */
  const [isLoading, setIsLoading] = useState(false)
  const [apiMessage, setApiMessage] = useState("")

  /* rerendering to watch the bulkSolidID which is autogenreated by backend */
  useEffect(() => {
    /* if the bulkSolidID is default (-1). This saves some unneeded rerendering*/
    if (state.bulkSolidID === -1) {

      /* get a new bulkSolidID */
      axios.get(process.env.REACT_APP_API + '/store/newbulksolidid')

        /* response handler */
        .then((response) => {
          /*
            response.data contains a lastCounterValue which is the last bulksolidid which was registered
            Set the new bulksolidid in this form to the lastCounterValue + 1
            Through 'updating' the lastCounterValue only in frontend, the backend stays at the old counterValue.
            if the form gets submitted, the backend compares (THIS ID) with (its ID from Database + 1).
            if they match it increases the databse counter value and saves the new bulksolid
          */
          dispatch({ type: "bulksolidid", payload: response.data.lastCounterValue + 1 })
        })

        /* error handler */
        .catch((error) => {
          console.log(error)
          alert('error, watch console')
        })
    }
  }, [state.bulkSolidID])


  /* Submit handler */
  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setApiMessage("")

    const bulkSolidPicture = state.pictureFile
    const msdsFile = state.msdsFile

    const formData = new FormData()


    if (bulkSolidPicture) {
      formData.append("bulkSolidPicture", bulkSolidPicture)
    }

    if (msdsFile) {
      formData.append("msdsFile", msdsFile)
    }

    formData.append('bulkSolidData', JSON.stringify(state))


    axios.post(process.env.REACT_APP_API + '/store/bulksolid', formData)
      .then(response => {
        console.log(response)
        setApiMessage("Saved")
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setApiMessage("Error")
        setIsLoading(false)
      })

  }


  /* Conditional Rendering */
  if (!isLoading && (apiMessage === "")) {

    /* if the page is not loading and there is no apiMessage */
    return (
      /* Show a nice Area for the Form */
      <Jumbotron fluid className="p-3">


        {/* The Form for bulk solid */}
        <Form onSubmit={submitData}>


          {/* Headline */}
          <h2 style={{ textAlign: "center" }}><strong>New bulk solid</strong></h2>


          {/* Input Components handled by context and reducer */}
          <BulkSolidFormDispatchContext.Provider value={dispatch}>
            <BulkSolidFormStateContext.Provider value={state}>


              {/* Outsourced Fields */}
              <BulkSolidFields />


            </BulkSolidFormStateContext.Provider>
          </BulkSolidFormDispatchContext.Provider>


          {/* Buttons */}
          <Row>

            {/* Create a new Bulk solid item. This gets stored with onHold: true so it apperas in OnHoldArea */}
            <Col>
              <Button variant="primary" type="submit" block>
                Add to OnHold Area
              </Button>
            </Col>

          </Row>

        </Form>

      </Jumbotron>
    )


    /* if page is loading or there is an apiMessag */
  } else {

    /* Render */
    return (

      <Jumbotron fluid className="p-3">
        {/* if isLoading */}
        {isLoading

          /* show Loading */
          ? "Loading..."

          /* else */
          :
          <>
            {/* show the apiMessage */}
            <div>
              <h3>
                {apiMessage}
              </h3>
            </div>

            {/* and a button to go back to form */}
            <Button onClick={_ => {

              /* Resets the form to default */
              dispatch({ type: "resetform" })

              /* sets the apiMessage to empty string */
              setApiMessage("")

            }}>
              Back
            </Button>

          </>
        }
      </Jumbotron>
    )

  }
};
