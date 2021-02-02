/* Imports */
import React, { useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import { BulkSolidState } from "../../Bulksolid/Bulksolid";
import Field from "./Field";
import Rack from "./Rack";

/* Type definitions */




/* REDUCER */

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

type RackActions =
  | { type: "setRackName", payload: string }
  | { type: "setShelf", payload: string }
  | { type: "setFields", payload: { field1: string, field2: string, field3: string } }
  | { type: "setFieldContents", payload: { [key: string]: number } }
  | { type: "setAllBulkSolids", payload: BulkSolidState[] }

type RackState = {
  shelf: string,
  fields: {
    field1: string,
    field2: string,
    field3: string
  },
  fieldContents: { [key: string]: number },
  rackName: string,
  allBulkSolids: BulkSolidState[]
}

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

export const RackStateContext = React.createContext<RackState>(RackInitState)
export const RackDispatchContext = React.createContext<React.Dispatch<RackActions>>(() => { })





/* Component */
export default function RackRoutes() {
  const [state, dispatch] = useReducer(RackReducer, RackInitState)


  /* Render */
  return (
    <RackDispatchContext.Provider value={dispatch}>
      <RackStateContext.Provider value={state}>
        <Switch>
          {/* Routing to a field */}
          <Route path="/lager/:rackName/:field">
            <Field />
          </Route>



          {/* Routing for a Rack */}
          <Route path="/lager/:rackName">
            <Rack />
          </Route>
        </Switch>
      </RackStateContext.Provider>
    </RackDispatchContext.Provider>
  )
};
