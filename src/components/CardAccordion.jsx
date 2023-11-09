import {Link} from 'react-router-dom'
import PropTypes from "prop-types"

const CardAccordion = ({icono, titulo, to, children, link=true}) => {

    return (
      <div className='col-lg-4 mb-3'>
        {(link == true) ? (
          <Link to={to} className='d-flex align-items-center btn btn-outline-secondary w-100 text-start p-3'>
              <span className='d-flex align-items-center me-2 fs-1'>{icono}</span>
              <div>
                  <span className='fw-bold'>{titulo}</span>
                  <br />
                  <span className='fw-light'>{children}</span>
              </div>
          </Link>
        ) : (
          <button to={to} className='d-flex align-items-center btn btn-outline-secondary w-100 text-start p-3'>
              <span className='d-flex align-items-center me-2 fs-1'>{icono}</span>
              <div>
                  <span className='fw-bold'>{titulo}</span>
                  <br />
                  <span className='fw-light'>{children}</span>
              </div>
          </button>
        ) }
      </div>
    )
}

CardAccordion.propTypes = {
  icono: PropTypes.element.isRequired,
  titulo: PropTypes.string.isRequired,
  to: PropTypes.string,
  link: PropTypes.bool,
  children: PropTypes.any
}

export default CardAccordion
