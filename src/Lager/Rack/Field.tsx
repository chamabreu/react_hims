import { useParams } from "react-router-dom"


interface IParams {
  rack: string,
  field: string
}


export default function Field() {
  const {field} = useParams<IParams>()

  /* Render */
  return (
    <>
      <h1>{field}</h1>
    </>
  )
};
