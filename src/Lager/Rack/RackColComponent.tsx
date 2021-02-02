import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { RackDispatchContext, RackStateContext } from './RackRoutes';
import { BulkSolidState } from '../../Bulksolid/Bulksolid';



/* Component for rackcol - this is a single field (cell) */
export default function RackColComponent(props: { field: string, layer: string }) {
  /* use states from context */
  const { shelf, fieldContents, rackName, allBulkSolids } = useContext(RackStateContext)
  /* get the dispatch from context */
  const rackDispatch = useContext(RackDispatchContext)

  /* local states */
  /* get the field ID */
  const [thisFieldID, setThisFieldID] = useState(`${shelf}${props.field}_${props.layer}`)
  /* if the field is occupied by a resource */
  const [occupied, setOccupied] = useState(false)
  /* the resource, if exists, which occupies the fielf */
  const [containedBulkSolid, setCotainedBulkSolid] = useState<BulkSolidState | null>(null)

  /* useffect to recalculate the field ID */
  useEffect(() => {
    setThisFieldID(`${shelf}${props.field}_${props.layer}`)
  }, [shelf, props.field, props.layer])

  /* useEffect to recalculate occupied */
  useEffect(() => {
    setOccupied(thisFieldID in fieldContents)
  }, [thisFieldID, fieldContents])

  /* useEffect to recalculate the bulksolid for the field or set it to null */
  useEffect(() => {
    if (occupied) {
      setCotainedBulkSolid(() => {
        const bulkSolidID = fieldContents[thisFieldID]
        return allBulkSolids.filter(bulkSolid => bulkSolid.bulkSolidID === bulkSolidID)[0]
      })
    } else {
      setCotainedBulkSolid(null)
    }
  }, [occupied, fieldContents, thisFieldID, allBulkSolids])


  /* Drag and drop handlers */
  function allowDrop(e: React.DragEvent<HTMLAnchorElement>) {
    e.preventDefault()
  }

  function dragEnter(e: React.DragEvent<HTMLAnchorElement>) {
    document.getElementById(e.currentTarget.id)?.classList.add("dragover")

  }

  function dragLeave(e: React.DragEvent<HTMLAnchorElement>) {
    document.getElementById(e.currentTarget.id)?.classList.remove("dragover")
  }

  function dropContent(e: React.DragEvent<HTMLAnchorElement>) {
    e.preventDefault()
    document.getElementById(e.currentTarget.id)?.classList.remove("dragover")

    const bulkSolidData: BulkSolidState = JSON.parse(e.dataTransfer.getData('bulkSolid'))

    const itemID = bulkSolidData.bulkSolidID
    const fieldID = e.currentTarget.id

    // console.log(fieldID, itemID)

    axios.post('http://localhost:5000/store/movebulksolid', {
      sourceItemID: itemID,
      targetFieldID: fieldID,
      currentRackName: rackName
    })
      .then(response => {
        // console.log(response.data)
        if (response.data.updatedRack) {
          const rackFields = response.data.updatedRack.rackFields
          rackDispatch({ type: 'setFieldContents', payload: rackFields })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }


  /* RENDER */
  return (
    <Col className="p-0">

      <Link
        id={thisFieldID}
        onDragEnter={e => {
          if (!occupied) {
            dragEnter(e)
          }
        }}
        onDragLeave={e => {
          if (!occupied) {
            dragLeave(e)
          }
        }}
        onDragOver={e => {
          if (!occupied) {
            allowDrop(e)
          }
        }}
        onDrop={e => {
          if (!occupied) {
            dropContent(e)
          }
        }}
        to={`/lager/${rackName}/${shelf}${props.field}_${props.layer}`}
        className={`field ${occupied ? "occupied" : ""}`}
      >
        <div style={{ pointerEvents: 'none' }}>
          <div>{shelf}{props.field}_{props.layer}</div>
          <div>
            {occupied
              ? `BulkSolidData: ${containedBulkSolid?.bulkSolidID}`
              : "Empty"
            }

          </div>
        </div>
      </Link>


    </Col>
  )
}

