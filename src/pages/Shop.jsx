import AccordionItem from '../components/AccordionItem'
import CardAccordion from '../components/CardAccordion'

import {FaFileInvoiceDollar} from 'react-icons/fa6'

const Shop = () => {
  return (
    <>
      <header>
        <h1 className='fw-bold text-uppercase h2'>Ventas</h1>
        <p className='h5 fw-light'>Gestiona los productos y venta de la tienda</p>
        <hr />
      </header>

      <section className='lista d-flex flex-column'>

        <AccordionItem open={true} titulo={"Contenido de ventas"} descripcion={"Revisa cuanto haz vendido y las ventas actuales"}>

          <CardAccordion titulo="Estado de ventas" to="/ventas" icono={<FaFileInvoiceDollar />}>
            Revisa el estado de ventas actuales
          </CardAccordion>

        </AccordionItem>
      
      </section>
    </>
  )
}

export default Shop
