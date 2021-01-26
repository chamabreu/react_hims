import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IProps {
  shelfname: string
}




export default function Shelf(
  /* Deconstruct Props */
  {
    shelfname
  }: IProps
  /* END */
) {




  /* A Rack Component with a Link Wrapper */
  // Could be outsorced on a new .tsx file if needed
  function RackComponent(props: { position: string }) {
    return (
      <Link style={{ textDecoration: "none" }} className="racklink" to={`/lager/:${shelfname}${props.position}`}>
        <div className="rack user-select-none d-flex justify-content-center align-items-center">
          {shelfname}x {props.position}
        </div>
      </Link>
    )
  }
  /* END */



  /* RENDER */
  return (
    <Col className="d-flex flex-column">
      <div className="align-self-center">
        <h3>{shelfname}</h3>
      </div>
      <div className="shelf">

        {/* Create 4 Racks in a shelf */}
        <RackComponent position="10-12" />
        <RackComponent position="7-9" />
        <RackComponent position="4-6" />
        <RackComponent position="1-3" />

      </div>
    </Col>
  )
  /* END */
};
