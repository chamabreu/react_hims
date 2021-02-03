/* Imports */
import { TSelectorOption } from "../Types/SelectTypes"


/* Type Definitions */
interface IProps {
  content: TSelectorOption
}


/* Component - custom component to create option entrys for select tags*/
export default function OptionComponent({content}: IProps) {

  /* Render */
  return (
    <option value={content.value}>{content.text}</option>
  )
};
