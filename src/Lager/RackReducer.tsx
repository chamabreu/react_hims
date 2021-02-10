/* Imports */
import React from 'react'

/* Reducer and Context for Racks */

/* Dispatch handler */
export const RackReducer = (state: RackState, action: RackActions): RackState => {
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

    /* set the onHoldList to a complete array of data */
    case 'setOnHoldList':
      return { ...state, onHoldList: action.payload }

    /* or update it and remove just a single bulkSolid */
    case 'updateOnHoldList':
      /* Get the bulkSolidID from the bulk solid which should be removed from onHold */
      const removeBulkSolidID = action.payload.bulkSolidID

      /* if the onHoldList is not empty */
      if (state.onHoldList) {

        /* create a new list with filtering */
        const updatedList = state.onHoldList.filter(bulkSolid => (bulkSolid.bulkSolidID !== removeBulkSolidID))

        /* and return new state with the new list */
        return { ...state, onHoldList: updatedList }



      } else {
        /* if the onHoldList is empty just return state. This should never be the case */
        return state
      }


    /* State to show or hide the on hold dialog */
    case 'setShowOnHoldDialog':
      return { ...state, showOnHoldDialog: action.payload }


    default:
      return state
  }
}

/* Actions  */
type RackActions =
  | { type: "setRackName", payload: string }
  | { type: "setShelf", payload: string }
  | { type: "setFields", payload: { field1: string, field2: string, field3: string } }
  | { type: "setFieldContents", payload: TRackFieldContents }
  | { type: "setAllBulkSolids", payload: TBulkSolid[] }
  | { type: "setOnHoldList", payload: TBulkSolid[] }
  | { type: "updateOnHoldList", payload: TBulkSolid }
  | { type: "setShowOnHoldDialog", payload: { dialogState: boolean, bulkSolidData?: TBulkSolid } }


/* Rack State Type */
type RackState = {
  shelf: string,
  fields: {
    field1: string,
    field2: string,
    field3: string
  },
  fieldContents: TRackFieldContents,
  rackName: string,
  allBulkSolids: TBulkSolid[],
  onHoldList?: TBulkSolid[],
  showOnHoldDialog: { dialogState: boolean, bulkSolidData?: TBulkSolid }
}



/* Other Types */
export type TRackFieldContents = { [key: string]: number }


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
  msdsFile: string,
  note: string,
  pictureFile: string,
  onHold: boolean,

}

/* Init Rack State */
export const RackInitState = {
  shelf: "",
  fields: {
    field1: "",
    field2: "",
    field3: ""
  },
  fieldContents: {},
  rackName: "",
  allBulkSolids: [],
  onHoldList: undefined,
  showOnHoldDialog: { dialogState: false, bulkSolidData: undefined }
}

/* Export Contexts */
export const RackStateContext = React.createContext<RackState>(RackInitState)
export const RackDispatchContext = React.createContext<React.Dispatch<RackActions>>(() => { })



