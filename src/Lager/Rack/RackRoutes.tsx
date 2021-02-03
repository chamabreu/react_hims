/* Imports */
import React, { useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import { TBulkSolid } from "../../Bulksolid/BulkSolidForm";
import Field from "./Field";
import Rack from "./Rack";




/* Reducer and Context for Racks */

/* Dispatch handler */
const RackReducer = (state: RackState, action: RackActions): RackState => {
  switch (action.type) {
    case 'setRackName':
      return { ...state, rackName: action.payload }

    case 'setShelf':
      return { ...state, shelf: action.payload }

    case 'setFields':
      return { ...state, fields: action.payload }

    case 'setFieldContents':
      return { ...state, fieldContents: action.payload }

    case 'setAllBulkSolids':
      return { ...state, allBulkSolids: action.payload }


    default:
      return state
  }
}

/* Actions  */
type RackActions =
  | { type: "setRackName", payload: string }
  | { type: "setShelf", payload: string }
  | { type: "setFields", payload: { field1: string, field2: string, field3: string } }
  | { type: "setFieldContents", payload: { [key: string]: number } }
  | { type: "setAllBulkSolids", payload: TBulkSolid[] }

  /* Rack State Type */
type RackState = {
  shelf: string,
  fields: {
    field1: string,
    field2: string,
    field3: string
  },
  fieldContents: { [key: string]: number },
  rackName: string,
  allBulkSolids: TBulkSolid[]
}

/* Init Rack State */
const RackInitState = {
  shelf: "",
  fields: {
    field1: "",
    field2: "",
    field3: ""
  },
  fieldContents: {},
  rackName: "",
  allBulkSolids: []
}

/* Export Contexts */
export const RackStateContext = React.createContext<RackState>(RackInitState)
export const RackDispatchContext = React.createContext<React.Dispatch<RackActions>>(() => { })





/* Component */
export default function RackRoutes() {
  const [state, dispatch] = useReducer(RackReducer, RackInitState)



  /* Render */
  return (
    /* Provide the dispatch and the state in 2 different contexts */
    <RackDispatchContext.Provider value={dispatch}>
      <RackStateContext.Provider value={state}>
        <Switch>


          {/* Routing for a Rack */}
          <Route path="/lager/:rackName">
            <Rack />
          </Route>


        </Switch>
      </RackStateContext.Provider>
    </RackDispatchContext.Provider>
  )
};
