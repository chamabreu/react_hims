/* Imports */
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Col, Row } from "react-bootstrap";
import { Route, Switch, useParams } from "react-router-dom";
import { TBulkSolid } from '../../Bulksolid/BulkSolidForm';
import Field from './Field';
import { RackDispatchContext, RackStateContext } from './RackRoutes';
import RackRowComponent from './RackRowComponent';

/* Type definitions */
/*
  IParams gets the link parameter which contains the rackposition.
  LinkExample: .../lager/A04-05-06
  A -> Shelf A
  04-05-06 -> the 3 horizontal fields that are viewed in this rack. (Maximum 12)
  Deconstructing from the URL the 3 fields on component mount
*/
interface IParams {
  rackName: string
}



/* Component */
export default function Rack() {
  /* rackState and rackDispatch context */
  const rackDispatch = useContext(RackDispatchContext)
  const rackState = useContext(RackStateContext)


  /* Get the rackname from the URL-Params */
  const { rackName } = useParams<IParams>()



  /* rerender if rackName (url) or the fieldContents changes (this should be anyways the same process) */
  useEffect(() => {
    /* Deconstruct the shelfname and the 3 horizontal fields of the Rack */
    const shelf = rackName.slice(0, 1)
    const fields = {
      field1: rackName.slice(1, 3),
      field2: rackName.slice(4, 6),
      field3: rackName.slice(7, 9),
    }
    /* set the RackContext with... */
    /* the viewed rackName */
    rackDispatch({ type: 'setRackName', payload: rackName })
    /* the viewed fields */
    rackDispatch({ type: 'setFields', payload: fields })
    /* the viewed shelf */
    rackDispatch({ type: 'setShelf', payload: shelf })


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
    axios.get(process.env.REACT_APP_API + '/api/store/rackdetails',
      /* give the rackName as parameter */
      { params: { rackName } }
    )

      /* solve the request */
      .then(response => {
        /*
        if the rack contains no fieldcontents, hence no ids, it returns empty
        so only try to set the data if its not empty
         */
        if (response.data) {
          /* extract the data */
          const bulkSolidIDs: TBulkSolid[] = response.data.allBulkSolids
          const fieldContents = response.data.rackFields

          /* and dispatch it in the context */
          rackDispatch({ type: 'setAllBulkSolids', payload: bulkSolidIDs })
          rackDispatch({ type: 'setFieldContents', payload: fieldContents })

          /* log that the rack is empty */
        } else {
          console.log("Empty Return")
        }
      })
      /* if the request fails, log it and warn user */
      .catch(error => {
        console.log(error)
        alert("Error - watch console")
      })

  }, [rackName, rackDispatch, rackState.fieldContents])



  /* Render */
  return (

    <Switch>


      {/* Routing to a field */}
      <Route path="/lager/:rackName/:field">
        <Field />
      </Route>


      {/* Routing to rack itself */}
      <Route path='/'>

        {/* Title of Rack */}
        <Row >
          <h3>Rackname: {rackName}</h3>
        </Row >


        {/* Rack Area */}
        <Row >

          {/* Rack Creation */}
          <Col>
            {/* Create 5 Rows for the Rack */}
            <RackRowComponent layer="E" />
            <RackRowComponent layer="D" />
            <RackRowComponent layer="C" />
            <RackRowComponent layer="B" />
            <RackRowComponent layer="A" />
          </Col >


        </Row >
      </Route>
    </Switch>

  )
};
