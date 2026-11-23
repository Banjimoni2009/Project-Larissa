import { Link } from "react-router-dom";

interface BtnProps {
    btnText: string;
    linkUrl: string;
    btnStyle: string;
}
function Buttons({btnText, linkUrl, btnStyle }: BtnProps) {
    return(
        <button className={`${btnStyle}  p-2  font-semibold cursor-pointer hover:transition hover:ease-in-out hover:duration-1000`}>
            <Link to={linkUrl}>{btnText}</Link>
        </button>
    )
}
export default Buttons

