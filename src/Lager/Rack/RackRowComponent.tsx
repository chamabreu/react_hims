import { useContext } from "react"
import { Row } from "react-bootstrap"
import { RackStateContext } from "./RackRoutes"
import RackColComponent from "./RackColComponent"

/* A Row in the rack (layer A-E), which contains the field components (cells) */
export default function RackRowComponent(props: { layer: string }) {
  const {fields} = useContext(RackStateContext)

  return (
    <Row>
      <RackColComponent layer={props.layer} field={fields.field1} />
      <RackColComponent layer={props.layer} field={fields.field2} />
      <RackColComponent layer={props.layer} field={fields.field3} />
    </Row>
  )
}