/* Imports */
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";


/* Type Declarations */
interface IProps {
  shelfname: string
}



/* Component */
export default function Shelf(
  /* Deconstruct Props */
  {
    shelfname
  }: IProps
) {




  /* A Rack Component with a Link Wrapper */
  // Could be outsorced on a new .tsx file if needed
  function RackComponent(props: { position: string }) {
    return (
      /* Returns a Cell which contains the Name of the rack */
      <Link to={`/lager/${shelfname}${props.position}`}>
        <div className='field d-flex justify-content-center'>
          {shelfname}{props.position}
        </div>
      </Link>
    )
  }



  /* RENDER */
  return (
    <Col>


      {/* Create the shelf with its 4 Racks */}
      <div className='shelf'>
        <RackComponent position="10-11-12" />
        <RackComponent position="07-08-09" />
        <RackComponent position="04-05-06" />
        <RackComponent position="01-02-03" />
      </div>

      {/* Name of Shelf */}
      <div className='d-flex justify-content-center'>
        <h3>{shelfname}</h3>
      </div>
    </Col>
  )
};
