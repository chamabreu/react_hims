import axios from 'axios'
import { TBulkSolid } from '../Bulksolid/BulkSolidForm'
import { TRackFieldContents } from '../Lager/RackReducer'



/* call to get an Array of TBulkSolid types from DB */
export function UpdateOnHoldList(dispatch: (bulkSolidArray: TBulkSolid[]) => void) {

  axios.get<TBulkSolid[]>(process.env.REACT_APP_API + '/onhold')

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



export function UpdateRackFields(rackName: string, dispatch: (bulkSolids: TBulkSolid[], rackFields: TRackFieldContents) => void) {
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
  axios.get<{ bulkSolids: TBulkSolid[], rackFields: TRackFieldContents }>(process.env.REACT_APP_API + '/store/rackdetails',
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

