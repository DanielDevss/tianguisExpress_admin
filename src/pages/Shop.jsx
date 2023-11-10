// import { Link } from 'react-router-dom'
import AccordionItem from '../components/AccordionItem'
import CardAccordion from '../components/CardAccordion'

import {FaRegSquarePlus, FaWarehouse, FaBagShopping} from 'react-icons/fa6'

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
          
          <CardAccordion titulo="Productos" to="/productos" icono={<FaWarehouse />}>
            Gestión de productos
          </CardAccordion>
      
        </AccordionItem>


        <AccordionItem open={true} titulo={"Estado de ventas"} descripcion={"Revisa cuanto haz vendido y las ventas actuales"}>

          <CardAccordion titulo="Estado de ventas" to="/estados-venta" icono={<FaBagShopping />}>
            Revisa el estado de ventas actuales
          </CardAccordion>

        </AccordionItem>
      
      </section>
    </>
  )
}

export default Shop
