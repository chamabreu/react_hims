import { useContext } from "react"
import { Row } from "react-bootstrap"
import { RackStateContext } from "../RackReducer"
import RackColComponent from "./RackColComponent"

/* A Row in the rack (layer A-E), which contains the field components (cells) */
export default function RackRowComponent(props: { layer: string }) {
  const { fields } = useContext(RackStateContext)
  /* 
    fields always contains 3 subfields
    {
      field1: 'a field name'
      field2: 'a field name'
      field3: 'a field name'
    }
    
    where 'a field name' can be one of 12 options: 01 - 12
    the RackRowComponent (this) shows a Row, hence 3 subfields (cells/fields)
    and name them with the fieldnames of the fields property

    a Rack (parent of this) shows always 3 colums (fields) horizontal and 5 rows (A-E)
    the rowname is the props.layer and is given from the parent.

    now the rack row can create 3 columns with a fieldname and a layer.
    the RackColComponent can then specify its name from the given props
  
  */

  /* Render */
  return (
    /* a Row that contains... */
    <Row>

      {/* 3 Columns (field1 - field3) with the RackRowComponent layer given from parent Component */}
      <RackColComponent layer={props.layer} field={fields.field1} />
      <RackColComponent layer={props.layer} field={fields.field2} />
      <RackColComponent layer={props.layer} field={fields.field3} />

    </Row>
  )
}