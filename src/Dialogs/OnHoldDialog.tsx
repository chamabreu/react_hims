/* Imports */
import axios from "axios";
import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { RackDispatchContext, RackStateContext } from "../Lager/RackReducer";


/* Component. This is a Dialog to ask the user if he wants to remove the bulksolid from on hold area */
export default function OnHoldDialog() {
  /* get the Context data */
  const { showOnHoldDialog } = useContext(RackStateContext)
  const rackDispatch = useContext(RackDispatchContext)


  /* if the user answers to remove bulksolid from on hold area */
  const handleRemove = async () => {

    /* Await the axios request to remove onhold state on database */
    /* TODO: No error handler implemented */
    const response = await axios.post(process.env.REACT_APP_API + '/onhold/removeonhold',
      { bulkSolidID: showOnHoldDialog.bulkSolidData!.bulkSolidID }
    )

    /*
    update the on hold list and remove the bulk solid from it. this is not asked from backend.
    would be more safe to do it with backend request, but needs more traffic.
    so this is just the client side state update. the backend database update is solved through the above axios
    */
    rackDispatch({ type: 'updateOnHoldList', payload: response.data })


    /* then close the window and reset the dialog data */
    rackDispatch({ type: 'setShowOnHoldDialog', payload: { dialogState: false, bulkSolidData: undefined } })
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