import PropTypes from "prop-types";
import {SiMicrosoftexcel} from "react-icons/si"

const CustomHeader = ({title}) => {
    return (
        <header className="d-flex justify-content-between">
            <h3 className="mx-0 h5">{title}</h3>
            <div className="d-flex gap-2">
                <input type="search" className="form-control" placeholder="🔎 Buscar registro" />
                <button className="btn btn-success"><SiMicrosoftexcel className="mb-1" /></button>
            </div>
        </header>
    )
}

CustomHeader.propTypes = {
    title: PropTypes.string
}

export default CustomHeader