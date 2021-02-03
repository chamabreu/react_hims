/* Imports */
import { Container } from "react-bootstrap";
import NewPallet from "./NewPallet";




/* Component to show all pallets and edit them. Not functional for now. */
export default function PalletManager() {

  /* Render */
  return (

    <Container>
      <h1>THIS IS OUT OF FUNCTION FOR NOW</h1>
      <h3>Below is going to be a list of Pallets.</h3>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <h3>And this box could be an overlay of adding a pallet</h3>
      <NewPallet />
    </Container>
  )
};
