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
) {




  /* A Rack Component with a Link Wrapper */
  // Could be outsorced on a new .tsx file if needed
  function RackComponent(props: { position: string }) {
    return (
      <Link className="rack d-flex justify-content-center align-items-center" style={{ textDecoration: "none" }} to={`/lager/${shelfname}${props.position}`}>
        {shelfname}x {props.position}
      </Link>
    )
  }



  /* RENDER */
  return (
    <Col className="d-flex flex-column">
      {/* Name of Shelf above the shelf */}
      <div className="align-self-center">
        <h3>{shelfname}</h3>
      </div>

      {/* Create the shelf with its 4 Racks */}
      <div className="shelf">
        <RackComponent position="10-11-12" />
        <RackComponent position="07-08-09" />
        <RackComponent position="04-05-06" />
        <RackComponent position="01-02-03" />
      </div>

    </Col>
  )
};
