import axios from 'axios'
import { TRackFieldContents, TBulkSolid } from '../Lager/RackReducer'



/* call to get an Array of TBulkSolid types from DB */
export function GetOnHoldList(dispatch: (bulkSolidArray: TBulkSolid[]) => void) {

  axios.get<TBulkSolid[]>(process.env.REACT_APP_API + '/onhold/data')

    /* handle response */
    .then(response => {

      /* Check if response.data is expected Arrray */
      if (Array.isArray(response.data)) {

        /* and call the dispatch callback with the data */
        dispatch(response.data)
      }

      /* if not, do nothing ??? cool??? */

    })

    /* handle request errors */
    .catch(error => {
      console.log(error)
      alert('error, look console')
    })

}



export function GetRackDetails(rackName: string, dispatch: (bulkSolids: TBulkSolid[], rackFields: TRackFieldContents) => void) {
  /* API Request for rackdetails */
  /* get the rackdetails.

    1) FIELD CONTENTS
      the API returns also fieldContents. these are all fields (cells) shown in the viewed Rack.
      its a Object with content structured {fieldName: bulkSolidID, {}, {}, ... } like this: 
      {
        A04_C: 28,
        A03_E: 9,
        A03_D: 67,
      }

    2) ALL BULK SOLID IDS
      the API returns an array of bulkSolidIDs that are used in this rack.
      this means, if a field in the viewed rack contains a bulk solid (see above), the API retuns this ID of the bulksolid.
      does not return a single ID multiple times

   */

  /* the get request */
  axios.get<{ bulkSolids: TBulkSolid[], rackFields: TRackFieldContents }>(process.env.REACT_APP_API + '/rack/getrack',
    /* give the rackName as parameter */
    { params: { rackName } }
  )

    /* solve the request */
    .then(response => {

      /*
      if the rack contains no fieldcontents, hence no bulksolid data,
      the response.data returns empty!!!

      so only try to set the data if its not empty
      */
      if (response.data) {
        /* extract the data */
        const returnBulkSolids = response.data.bulkSolids
        const returnRackFields = response.data.rackFields

        /* and call the callback to update the context */
        dispatch(returnBulkSolids, returnRackFields)

      }

      /* if no data do nothing ??? */
    })

    /* handle request errors */
    .catch(error => {
      console.log(error)
      alert('error, look console')
    })
}



/* set onHold property to false on specified bulkSolidID */
export function ChangeBSOnHoldState(bulkSolidID: number, dispatch: (updatedBulkSolid: TBulkSolid) => void) {

  /* the post request */
  axios.put<TBulkSolid>(process.env.REACT_APP_API + '/bulksolid/onhold', { bulkSolidID })

    /* if succeeded callback with the updated bulk solid data */
    .then(response => {
      console.log("BACK FROM REMOVE ON HOLD WITH")
      console.log(response.data)
      dispatch(response.data)
    })

    /* if error handle it */
    .catch(error => {
      console.log(error)
      alert('error, look console')
    })


};


/* send a request to handle the relations in the database */
export function MoveBulkSolid(
  itemID: number,
  fieldID: string,
  rackName: string,

  /* Callback function to set states */
  dispatch: (
    updatedRack: {
      rackFields: TRackFieldContents,
      rackName: string
    }
  ) => void) {

  axios.put<{ rackName: string, rackFields: TRackFieldContents }>(process.env.REACT_APP_API + '/bulksolid/storedat', {
    /* the bulk solid ID to change */
    sourceItemID: itemID,
    /* the target field to extend the bulk solid storedAt array */
    targetFieldID: fieldID,
    /* the rackname to update its content field */
    currentRackName: rackName
  })

    /* dispatch the new data */
    .then(response => {
      console.log("GOT DATA BACK, LOOK")
      console.log(response.data)
      console.log("GOOD???")
      dispatch({ rackName: response.data.rackName, rackFields: response.data.rackFields })
    })



    /* if error handle it */
    .catch(error => {
      console.log(error)
      alert('error, look console')
    })

}


export function GetMediaURL(path?: string) {
  return path ? `${process.env.REACT_APP_API}/${path}` : undefined
}


/* Store a new bulksolid */
export function StoreBulkSolid(formData: FormData, dispatch: (success: boolean) => void) {

  /* API Call */
  axios.post(process.env.REACT_APP_API + '/bulksolid/create',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

    /* response... no data expected, so just return true to dispatch */
    .then(response => {
      /* maybe check response.status?! */
      dispatch(true)
    })


    /*
      error handler.
      dispatch a false for state management
    */
    .catch(error => {
      console.log(error)
      alert('error, watch console')
      dispatch(false)
    })
}



/* get a new bulkSolidID */
export function GetNewBulkSolidID(dispatch: (newBulkSolidID: number) => void) {
  axios.get<{ counterValue: number }>(process.env.REACT_APP_API + '/bulksolid/getnewid')
    /*
      response.data contains a the last bulksolidid which was registered
      Set the new bulksolidid in this form to the lastCounterValue + 1
      Through 'updating' the lastCounterValue only in frontend, the backend stays at the old counterValue.
      if the form gets submitted, the backend compares (THIS ID) with (its ID from Database + 1).
      if they match it increases the database counter value and saves the new bulksolid
    */
    .then(response => {
      dispatch(response.data.counterValue + 1)
    })


    /* error handler */
    .catch((error) => {
      console.log(error)
      alert('error, watch console')
    })

}