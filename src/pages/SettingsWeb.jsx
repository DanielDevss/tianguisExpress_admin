import AccordionItem from "../components/AccordionItem";
import CardAccordion from "../components/CardAccordion";

import {CgToolbarTop} from "react-icons/cg"

const SettingsWeb = () => {

  return (
    <>
      <header>
        <h1 className='fw-bold text-uppercase h2'>Ajustes del contenido del Sitio</h1>
        <p className='h5 fw-light'>Personaliza el contenido que se muestra en el sitio web desde aquí</p>
        <hr />
      </header>

      <AccordionItem titulo={"Personaliza tu web"} descripcion={"Remplaza productos de paneles y carruseles"} open={true}>

        <CardAccordion icono={<CgToolbarTop />} to={"/cinta-utilidades"} titulo={"Cinta de uitilidades"}>Personaliza el titulo, enlace y tema</CardAccordion>
      
      </AccordionItem>

    </>
  )
}

export default SettingsWeb
