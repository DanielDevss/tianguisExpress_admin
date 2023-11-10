import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const IndiceNavegacion = ({navegacion}) => {
  return (
    <nav>
        <ol className="breadcrumb">
            {navegacion && navegacion.map((nav, key) => (
                <li className={`breadcrumb-item ${nav.estado}`} key={key}>{nav.estado !== "active" ? (
                    <Link to={nav.to}>{nav.label}</Link>
                ):(
                    <span className="text-muted">{nav.label}</span>
                )}</li>
            ))}
        </ol>
    </nav>
  )
}

IndiceNavegacion.propTypes = {
    navegacion: PropTypes.array.isRequired
}

export default IndiceNavegacion