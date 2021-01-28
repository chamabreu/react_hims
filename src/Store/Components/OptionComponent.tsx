/* Imports */
import { TSelectorOption } from "../Store"


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
