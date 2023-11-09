import AccordionItem from "../components/AccordionItem"
import CardAccordion from "../components/CardAccordion"
import Header from "../components/Header"
import { FaEnvelopeCircleCheck } from "react-icons/fa6"
import {IoIosPeople} from "react-icons/io"

const Mailes = () => {
  return (
    <>
      <Header titulo={"Suscripciones y clientes"}>Gestiona los correos suscritos a Complementi</Header>

      <section className='d-flex flex-column'>

        <AccordionItem open={true} titulo={"Correos"} descripcion={"Gestión de correos"}>
          <CardAccordion titulo={"Lista de correos suscritos"} to={"/mostrar-suscritos"} icono={<FaEnvelopeCircleCheck />}>Observa y elimina las suscripciones</CardAccordion>
          <CardAccordion titulo={"Clientes"} to={"/clientes"} icono={<IoIosPeople />}>Información de clientes</CardAccordion>
        </AccordionItem>

      </section>
    </>
  )
}

export default Mailes
