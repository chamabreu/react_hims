/* Imports */
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BulkSolidState } from '../../Bulksolid/Bulksolid';
import { RackDispatchContext } from './RackRoutes';
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
  const dispatch = useContext(RackDispatchContext)


  /* Get the rackname from the URL-Params */
  const { rackName } = useParams<IParams>()





  useEffect(() => {
    /* Deconstruct the shelfname and the 3 horizontal fields of the Rack */
    const shelf = rackName.slice(0, 1)
    const fields = {
      field1: rackName.slice(1, 3),
      field2: rackName.slice(4, 6),
      field3: rackName.slice(7, 9),
    }

    dispatch({ type: 'setRackName', payload: rackName })
    dispatch({ type: 'setFields', payload: fields })
    dispatch({ type: 'setShelf', payload: shelf })


    axios.get('http://localhost:5000/store/rackdetails',
      { params: { rackName } }
    )
      .then(response => {
        if (response.data) {
          const bulkSolidIDs: BulkSolidState[] = response.data.allBulkSolids
          const fieldContents = response.data.rackFields
          // console.log(bulkSolidIDs)
          // console.log(fieldContents)
          dispatch({ type: 'setAllBulkSolids', payload: bulkSolidIDs })
          dispatch({ type: 'setFieldContents', payload: fieldContents })
        } else {
          console.log("Empty Return")
        }
      })

  }, [rackName, dispatch])



  /* Render */
  return (

    <>
      <Row >
        {/* Display the Container for the Rack */}

        {/* Title of Rack */}
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
    </>

  )
};
