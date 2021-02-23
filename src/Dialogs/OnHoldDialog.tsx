/* Imports */
import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { API_BS_ChangeBSOnHoldState } from "../APICalls/API";
import { RackDispatchContext, RackStateContext } from "../Lager/RackReducer";



/* Component. This is a Dialog to ask the user if he wants to remove the bulksolid from on hold area */
export default function OnHoldDialog() {
  /* get the Context data */
  const { showOnHoldDialog } = useContext(RackStateContext)
  const rackDispatch = useContext(RackDispatchContext)


  /* if the user answers to remove bulksolid from on hold area */
  const handleRemove = async () => {

    /* Remove bulk solid from on hold with API call. This sets the onHold property of the item to false */
    API_BS_ChangeBSOnHoldState(showOnHoldDialog.bulkSolidData!.bulkSolidID, (updatedBulkSolid) => {


      /* success handler, update the onHoldlist with the updatedBulkSolid from backend */
      rackDispatch({ type: 'updateOnHoldList', payload: updatedBulkSolid })

      /* then close the window and reset the dialog data */
      rackDispatch({ type: 'setShowOnHoldDialog', payload: { dialogState: false, bulkSolidData: undefined } })
    })

  }

  /* if the user answers to keep the bulksolid in on hold area */
  const handleKeep = () => {

    /* just close the window and reset the dialog data */
    rackDispatch({ type: 'setShowOnHoldDialog', payload: { dialogState: false, bulkSolidData: undefined } })
  }



  /* Render */
  return (
    /* the Modal component to show. this overlays the whole screen */
    /* Can be customized */
    <Modal show={showOnHoldDialog.dialogState} onHide={handleKeep}>

      {/* Header */}
      <Modal.Header closeButton>
        <Modal.Title>More?</Modal.Title>
      </Modal.Header>

      {/* Body */}
      <Modal.Body>
        <p>
          Have you more to store of
          </p>
        <p>
          <strong>{showOnHoldDialog.bulkSolidData?.description}</strong> ?
          </p>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer>

        {/* Handle Remove button */}
        <Button variant="secondary" onClick={handleRemove}>
          Nope, remove it from on hold area.
          </Button>

        {/* Handle Keep button */}
        <Button variant="primary" onClick={handleKeep}>
          Yes, keep it in on hold area.
          </Button>

      </Modal.Footer>


    </Modal>
  );
}

// render(<Example />);