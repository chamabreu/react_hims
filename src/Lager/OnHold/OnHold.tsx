/* Imports */
import axios from "axios";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { TBulkSolid } from "../../Bulksolid/BulkSolidForm"
import OnHoldCard from "./OnHoldCard";


/* Component */
export default function OnHold() {
  /* the items from the database which are tagged as onHold */
  const [holdItems, setHoldItems] = useState<TBulkSolid[]>([])

  /* get the items for the onHoldArea */
  useEffect(() => {

    /* request to onhold */
    axios.get("http://localhost:5000/onhold")

      /* handle response */
      .then(response => {
        /* if there are items onHold */
        if (response.data.length !== 0) {
          /* set the state */
          setHoldItems(response.data)
        }
      })

      /* handle error */
      .catch((error) => {
        console.log(error)
        alert('error, look console')
      })

  }, [])


  /* Render the OnHold waiting area */
  return (
    <Col>

      {/* Topic */}
      <div>
        <h3>On Hold</h3>
      </div>

      {/* the area for the onHold cards */}
      <div className='onholdarea'>

        {/* Info about Counted Cards */}
        There are {holdItems.length} items on hold.

        {/* create for each item in the holdItems state a new OnHoldCard to list it here */}
        {holdItems.map((aHoldItem) => <OnHoldCard key={aHoldItem.bulkSolidID} holdItem={aHoldItem} />)}

      </div>

    </Col>
  )
};
