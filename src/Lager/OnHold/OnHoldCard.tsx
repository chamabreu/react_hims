import React from 'react'
import { BulkSolidState } from "../../Bulksolid/Bulksolid";

interface IProps {
  holdItem: BulkSolidState
}

export default function OnHoldCard(props: IProps) {

  function dragItem(event: React.DragEvent<HTMLDivElement>) {
    let bulkSolidAsString = JSON.stringify(props.holdItem)
    event.dataTransfer.setData('bulkSolid', bulkSolidAsString)
  }




  return (
    <div
      id={props.holdItem.bulkSolidID.toString()}
      className="holdcard"
      draggable
      onDragStart={e => dragItem(e)}
    >
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
