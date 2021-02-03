/* Imports */
import React from 'react'
import { TBulkSolid } from "../../Bulksolid/BulkSolidForm";

/* Type Declarations */
interface IProps {
  holdItem: TBulkSolid
}


/* Component of a single OnHoldCard - this holds the information about the bulk solid which property is OnHold */
export default function OnHoldCard(props: IProps) {

  /* implement the drag start of a card. The other drag handlers are managed by the fields itself*/
  function dragStart(event: React.DragEvent<HTMLDivElement>) {
    /* set the bulkSolid as a string to pass the complete object to the drag receiver */
    let bulkSolidAsString = JSON.stringify(props.holdItem)

    /* set the dataTransfer data to the bulk solid data */
    event.dataTransfer.setData('bulkSolid', bulkSolidAsString)
  }



  /* Render */
  return (
    
    /* the card outline */
    <div
      id={props.holdItem.bulkSolidID.toString()}
      className="holdcard"
      draggable
      onDragStart={e => dragStart(e)}
    >

      {/* fill with data you want */}
      <div>
        ID: {props.holdItem.bulkSolidID}
      </div>
      <div>
        Arrived: {props.holdItem.arrivalDate}
      </div>
      <div>
        Entered by: {props.holdItem.enteredBy}
      </div>

    </div>

  )
};
