import AccordionItem from '../components/AccordionItem'
import CardAccordion from '../components/CardAccordion'

import {FaRegSquarePlus, FaWarehouse, FaBagShopping, FaFileInvoiceDollar} from 'react-icons/fa6'
import {IoTicket} from "react-icons/io5"

const Shop = () => {
  return (
    <>
      <header>
        <h1 className='fw-bold text-uppercase h2'>Tienda y ventas</h1>
        <p className='h5 fw-light'>Gestiona los productos y venta de la tienda</p>
        <hr />
      </header>

      <section className='lista d-flex flex-column'>
        
        <AccordionItem titulo={"Productos"} descripcion={"Gestiona los productos disponibles"} open={true}>

          <CardAccordion titulo="Añadir un producto" to="/nuevo-producto" icono={<FaRegSquarePlus />}>
            Añade nuevos productos al inventario
          </CardAccordion>
          
          <CardAccordion titulo="Productos" to="/productos" icono={<FaBagShopping />}>
            Gestión de productos
          </CardAccordion>
          
          <CardAccordion titulo="Inventario" to="/inventario" icono={<FaWarehouse />}>
            Gestiona tu inventario
          </CardAccordion>
      
        </AccordionItem>


        <AccordionItem open={true} titulo={"Contenido de ventas"} descripcion={"Revisa cuanto haz vendido y las ventas actuales"}>

          <CardAccordion titulo="Estado de ventas" to="/ventas" icono={<FaFileInvoiceDollar />}>
            Revisa el estado de ventas actuales
          </CardAccordion>

          <CardAccordion titulo="Cupones de descuento" to="/cupones" icono={<IoTicket />}>
            Agrega o quita cupones de descuento
          </CardAccordion>

        </AccordionItem>
      
      </section>
    </>
  )
}

export default Shop
