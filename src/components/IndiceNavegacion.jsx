import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const IndiceNavegacion = ({navegacion, className}) => {
  return (
    <></>
    // <nav>
    //     <ol className={`breadcrumb ${className}`}>
    //         {navegacion && navegacion.map((nav, key) => (
    //             <li className={`breadcrumb-item ${nav.estado}`} key={key}>{nav.estado !== "active" ? (
    //                 <Link to={nav.to}>{nav.label}</Link>
    //             ):(
    //                 <span className="text-muted">{nav.label}</span>
    //             )}</li>
    //         ))}
    //     </ol>
    // </nav>
  )
}

IndiceNavegacion.propTypes = {
    navegacion: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default IndiceNavegacion