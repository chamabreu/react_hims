/* Imports */
import { useContext, useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import { TBulkSolid } from "../../Bulksolid/BulkSolidForm"
import { RackStateContext } from "./RackRoutes"

/* Type definitions */
/*
  IParams gets the link parameter which contains the rackposition.
  LinkExample: .../lager/:rack/A05.D
  for :rack look Rack.tsx
  A -> Shelf A
  05 -> the horizontal field of a rack. (Maximum 12)
  .D -> the layer of the rack (could be A-E)
*/
interface IParams {
  rack: string,
  field: string
}


/* Component */
export default function Field() {
  /* Get Context of RackState */
  const rackState = useContext(RackStateContext)

  /* Deconstructing the field from URL-Params */
  const { field } = useParams<IParams>()
  /* Get the History to 'go back' */
  const history = useHistory()

  /* useState for specified bulkSolid in this field */
  const [bulkSolid, setBulkSolid] = useState<TBulkSolid>()


  /*
  if field (url) or RackState changes, this rerenders
  on rerender it sets the bulkSolid for the field
  */
  useEffect(() => {
    const bulkSolidID = rackState.fieldContents[field]
    const bulkSolidData = rackState.allBulkSolids.filter(bulkSolid => bulkSolid.bulkSolidID === bulkSolidID)[0]
    setBulkSolid(bulkSolidData)
  }, [field, rackState.fieldContents, rackState.allBulkSolids])


  /* Conditinal Render Logic */
  /* if there is a bulkSolid in this field... */
  if (bulkSolid) {

    /* Render WITH bulksolid content */
    return (

      /* The Field Container */
      <>

        {/* Button to go back to Rack */}
        <Row>
          <Button onClick={history.goBack}>Back to Rack</Button>
        </Row>


        {/* Name of the Field */}
        <Row>
          <h3>Rack Field: {field}</h3>
        </Row>


        {/* Details of the bulk solid content */}
        <Row>


          {/* an image if available */}
          <Col className='col-4'>
            <img className="fieldimage" src={`http://localhost:5000/${bulkSolid.pictureFile}`} alt="NoPic" />
          </Col>

          {/* show the details that are wanted */}
          <Col>
            <div><strong>Bulk solid ID:</strong> {bulkSolid.bulkSolidID}</div>
            <div><strong>Description:</strong> {bulkSolid.description}</div>
            <div><strong>MSDS Sheet Available:</strong> {bulkSolid.msds ? "Yes" : "No"}</div>
            <div><strong>Explosion Protection:</strong> {bulkSolid.exprotection ? "Yes" : "No"}</div>
            <div><strong>Bulk Arrival:</strong> {bulkSolid.arrivalDate}</div>
            <div><strong>Note:</strong> {bulkSolid.note}</div>
            <div><strong>A-ID:</strong> {bulkSolid.aID}</div>
            <div><strong>CAS-Number:</strong> {bulkSolid.casNumber}</div>
            <div><strong>Density:</strong> {bulkSolid.density}</div>
            <div><strong>Bulk solid shape:</strong> {bulkSolid.bulkSolidShape}</div>
            <div><strong>Link to MSDS file:</strong> {bulkSolid.msdsFile}</div>
            <div><strong>Link to Picture:</strong> {bulkSolid.pictureFile}</div>
            <div><strong>Entered by:</strong> {bulkSolid.enteredBy}</div>
          </Col>

        </Row>

        {/* Buttons to add additional functionality - for now they are 'out of order' */}
        <Row className='justify-content-around mt-3'>
          <Button onClick={_ => alert("Out of Function :-)")}>Store</Button>
          <Button onClick={_ => alert("Out of Function :-)")}>Take</Button>
          <Button onClick={_ => alert("Out of Function :-)")}>Move</Button>
        </Row>

      </>
    )


    /* if there is NO bulksolid in this field, give an empy field back */
  } else {

    /* Render WITHOUT bulksolid content */
    return (

      <>
        {/* Button to go back to Rack */}
        <Row>
          <Button onClick={history.goBack}>Back to Rack</Button>
        </Row>

        {/* notify user that this field is empty */}
        <div>
          Nothing in here
        </div>
      </>
    )
  }
};
