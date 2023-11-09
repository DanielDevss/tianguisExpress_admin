import GifComunicando from "../assets/images/comunicando.gif";
import PropTypes from "prop-types";

const Preloader = ({texto, imagen = GifComunicando, active=false}) => {
  return (
    <div className={`preloader ${active && 'show'}`}>
        <img src={imagen} className="preloader-gif" alt="Comunicando con el servidor" />
        <p className="preloader-texto">{texto}</p>
    </div>
  )
}

Preloader.propTypes = {
    texto: PropTypes.string.isRequired,
    imagen: PropTypes.string,
    active: PropTypes.bool
}

export default Preloader