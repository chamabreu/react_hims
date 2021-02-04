/* Imports */
import axios from "axios";
import { useContext, useEffect } from "react";
import { Col } from "react-bootstrap";
import { RackDispatchContext, RackStateContext } from "../RackReducer";
import OnHoldCard from "./OnHoldCard";


/* Component */
export default function OnHold() {
  /* the items from the database which are tagged as onHold extracted from rackState */
  const { onHoldList } = useContext(RackStateContext)
  /* Rackdispatch Context */
  const rackDispatch = useContext(RackDispatchContext)


  /* get the items for the onHoldArea */
  useEffect(() => {

    /* request to onhold */
    axios.get(process.env.REACT_APP_API + '/onhold')

      /* handle response */
      .then(response => {

        /* if there are items onHold */
        if (Array.isArray(response.data)) {
          /* set the rackState */
          rackDispatch({ type: 'setOnHoldList', payload: response.data })
        }
      })

      /* handle error */
      .catch((error) => {
        console.log(error)
        alert('error, look console')
      })

  }, [rackDispatch])

  
  /* Render the OnHold waiting area */
  return (
    <Col>

      {/* Topic */}
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <h1>On Hold</h1>
        <p>Drag and Drop an item on a rackfield</p>
      </div>

      {/* the area for the onHold cards */}
      <div className='onholdarea'>

        {/* create for each item in the holdItems state a new OnHoldCard to list it here */}
        {onHoldList && onHoldList.length !== 0
          ? onHoldList.map((aHoldItem) => <OnHoldCard key={aHoldItem.bulkSolidID} holdItem={aHoldItem} />)
          : <div className='onholdempty'>Every item is stored in your racks. Tidy and clean!</div>
        }

      </div>

    </Col>
  )
};
