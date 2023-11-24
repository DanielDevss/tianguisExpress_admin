import Header from "../components/Header"
import CardAccordion from "../components/CardAccordion"
import AccordionItem from "../components/AccordionItem"
import {FaRegSquarePlus, FaBagShopping } from 'react-icons/fa6'

const Productos = () => {
  return (
    <>
        <Header>
        <h1 className='fw-bold text-uppercase h2'>Productos</h1>
        <p className='h5 fw-light'>Gestiona los productos de tu tienda</p>
        <hr />
      </Header>

      <section className='lista d-flex flex-column'>
        
        <AccordionItem titulo={"Productos"} descripcion={"Gestiona los productos disponibles"} open={true}>

          <CardAccordion titulo="Añadir un producto" to="/nuevo-producto" icono={<FaRegSquarePlus />}>
            Añade nuevos productos al inventario
          </CardAccordion>
          
          <CardAccordion titulo="Productos" to="/productos" icono={<FaBagShopping />}>
            Gestión de productos
          </CardAccordion>
      
        </AccordionItem>
      
      </section>
    </>
  )
}

export default Productos