import PropTypes from "prop-types";
import {SiMicrosoftexcel} from "react-icons/si";
import {PiPlusBold} from "react-icons/pi";
import {Link} from "react-router-dom";

const CustomHeader = ({title, btnAdd = false, toBtnAdd, searchOnChange, placeholder}) => {
    return (
        <header className="d-flex justify-content-between">
            <h3 className="mx-0 h5">{title}</h3>
            <div className="d-flex gap-2">
                <input onChange={searchOnChange} type="search" className="form-control" placeholder={`🔎 ${placeholder}`} />
                <button className="btn btn-success"><SiMicrosoftexcel className="mb-1" /></button>
                {btnAdd && <Link to={toBtnAdd} className="btn btn-primary"><PiPlusBold className="mb-1" /></Link>}
            </div>
        </header>
    )
}

CustomHeader.propTypes = {
    title: PropTypes.string,
    btnAdd: PropTypes.bool,
    toBtnAdd: PropTypes.string,
    searchOnChange: PropTypes.func,
    placeholder: PropTypes.string.isRequired
}

export default CustomHeader