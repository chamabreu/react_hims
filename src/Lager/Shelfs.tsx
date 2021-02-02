/* Imports */
import { Row } from "react-bootstrap";
import Shelf from "./Shelf";


/* Component */
export default function Shelfs() {


  /* RENDER */
  return (

    <Row>
      <Shelf shelfname="A" />
      <Shelf shelfname="B" />
      <Shelf shelfname="C" />
    </Row>


  )
};
