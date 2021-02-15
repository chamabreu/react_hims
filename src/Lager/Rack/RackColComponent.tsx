/* Imports */
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RackDispatchContext, RackStateContext, TRackFieldContents, TBulkSolid } from '../RackReducer';
import * as API from '../../APICalls/API'



/* Component for rackcol - this is a single field (cell) */
export default function RackColComponent(props: { field: string, layer: string }) {

  /* get rackStates and rackDispatch from context */
  const { shelf, fieldContents, rackName, allBulkSolids } = useContext(RackStateContext)
  const rackDispatch = useContext(RackDispatchContext)


  /* local states - could be outsorced in a separate reducer if needed */
  /* get the field ID */
  const [thisFieldID, setThisFieldID] = useState(`${shelf}${props.field}_${props.layer}`)
  /* if the field is occupied by a resource */
  const [occupied, setOccupied] = useState(false)
  /* the resource, if exists, which occupies the fielf */
  const [containedBulkSolid, setContainedBulkSolid] = useState<TBulkSolid | null>(null)




  /* Rerendering */
  /* recalculate the field ID */
  useEffect(() => {
    setThisFieldID(`${shelf}${props.field}_${props.layer}`)
  }, [shelf, props.field, props.layer])


  /* recalculate occupied */
  useEffect(() => {
    setOccupied(thisFieldID in fieldContents)
  }, [thisFieldID, fieldContents])


  /* recalculate the bulksolid for the field or set it to null */
  useEffect(() => {
    if (occupied) {
      setContainedBulkSolid(() => {
        const bulkSolidID = fieldContents[thisFieldID]
        return allBulkSolids.filter(bulkSolid => bulkSolid.bulkSolidID === bulkSolidID)[0]
      })
    } else {
      setContainedBulkSolid(null)
    }
  }, [occupied, fieldContents, thisFieldID, allBulkSolids])



  /* Drag and drop handlers only active if the field is not occupied - look render methods */
  /* allow drop in the field */
  function allowDrop(e: React.DragEvent<HTMLAnchorElement>) {
    e.preventDefault()
  }

  /* give the field a class 'dragover' when 'dragging over it'. this gives the field specific styling */
  function dragEnter(e: React.DragEvent<HTMLAnchorElement>) {
    document.getElementById(e.currentTarget.id)?.classList.add("dragover")

  }

  /* remove the class 'dragover' when 'leaving dragging'. */
  function dragLeave(e: React.DragEvent<HTMLAnchorElement>) {
    document.getElementById(e.currentTarget.id)?.classList.remove("dragover")
  }

  /* dropping a bulk solid card on a field */
  function dropContent(e: React.DragEvent<HTMLAnchorElement>) {
    e.preventDefault()

    /* remove the dragging styling */
    document.getElementById(e.currentTarget.id)?.classList.remove("dragover")

    /* get the bulkSolidData from the dragged card */
    const bulkSolidData: TBulkSolid = JSON.parse(e.dataTransfer.getData('bulkSolid'))


    /* get the ID of the bulkSolidData */
    const itemID = bulkSolidData.bulkSolidID
    /* get the fieldID on which the card was dropped */
    const fieldID = e.currentTarget.id


    /* send a request to handle the relations in the database */
    API.MoveBulkSolid(itemID, fieldID, rackName, (updatedRack) => {

      /*
        and set the fieldContents of the viewed rack.
        this updates the whole view and sets the new "occupied states"
      */
      console.log("DISPATCHING WITH")
      console.log(updatedRack)
      rackDispatch({ type: 'setFieldContents', payload: updatedRack.rackFields })

      /* Update the RackFields to show new moved items. */
      API.GetRackDetails(rackName, (bulkSolids: TBulkSolid[], rackFields: TRackFieldContents) => {
        rackDispatch({ type: 'setAllBulkSolids', payload: bulkSolids })
        rackDispatch({ type: 'setFieldContents', payload: rackFields })

        /*
        Open the Dialog to ask user about removing from on hold area.
        This only opens if all calls were successfull
        Else an alert is shown from API Module
        */
        rackDispatch({ type: 'setShowOnHoldDialog', payload: { dialogState: true, bulkSolidData } })
      })
    })


  }


  /* RENDER */
  return (
    <Col className="p-0">

      {/* the Link to the specific field (cell). this is the wrapper for the content. */}
      <Link
        /* give this field an ID. this is needed by the drag-drop event */
        id={thisFieldID}

        /* the link (field component) to which a single click leads */
        to={`/lager/${rackName}/${shelf}${props.field}_${props.layer}`}

        /* set the styling of the field based on the occupied state */
        className={`field ${occupied ? "occupied" : ""}`}

        /*
          handle drag events. each checks first if the field is not occupied.
          if not occupied, handle the drag.
        */
        /* drag enter */
        onDragEnter={e => {
          if (!occupied) {
            dragEnter(e)
          }
        }}

        /* drag leave */
        onDragLeave={e => {
          if (!occupied) {
            dragLeave(e)
          }
        }}

        /* drag over */
        onDragOver={e => {
          if (!occupied) {
            allowDrop(e)
          }
        }}

        /* drop bulk solid card */
        onDrop={e => {
          if (!occupied) {
            dropContent(e)
          }
        }}
      >

        {/*
          the child content of a rack field (cell). this can be costumized.
          IMPORTANT: the style {pointerEvents "none"} disables all interaction with the content.
          this is needed for the drag events to work properly and ignore child objects.
        */}
        <div style={{ pointerEvents: 'none' }} className='d-flex justify-content-between flex-grow-1'>
          <div className='d-flex flex-column justify-content-center flex-grow-1'>

            {/* show the field name */}
            <div>{shelf}{props.field}_{props.layer}</div>
            {/* show the field ID if occupied, if not show 'Empty' */}
            <div>
              {occupied
                ? `ID: ${containedBulkSolid?.bulkSolidID}`
                : "Empty"
              }

            </div>
          </div>

          {/* show the picture of the content, or nothing */}
          <div className='d-flex justify-content-center flex-grow-1'>
            {containedBulkSolid?.pictureFile
              ? <img style={{ width: '90px' }} src={API.GetMediaURL(containedBulkSolid?.pictureFile)} alt="NoPic" />
              : null
            }
          </div>
        </div>
      </Link>


    </Col>
  )
}

