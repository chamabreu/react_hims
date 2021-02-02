import axios from "axios";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { BulkSolidState } from "../../Bulksolid/Bulksolid"
import OnHoldCard from "./OnHoldCard";



export default function OnHold() {
  const [holdItems, setHoldItems] = useState<BulkSolidState[]>([])

  useEffect(() => {
    axios.get("http://localhost:5000/onhold")
      .then(response => {
        // console.log(response)
        if (response.data.length !== 0) {
          setHoldItems(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  return (
    <Col>

      {/* Name of the field */}
      <div>
        <h3>On Hold</h3>
      </div>

      {/* Create the OnHold Field to list waiting items */}
      <div className='onholdarea'>
        There are {holdItems.length} items on hold.
        {holdItems.map((aHoldItem) => <OnHoldCard key={aHoldItem.bulkSolidID} holdItem={aHoldItem} />)}
      </div>

    </Col>
  )
};
