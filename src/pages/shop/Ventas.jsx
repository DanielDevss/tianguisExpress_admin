import Header from "../../components/Header"
import TablaVentas from "../../components/tables/TablaVentas"
import { StyleSheetManager } from "styled-components"
const Ventas = () => {
  return (
    <>
        <Header titulo={"Estado de ventas"}>Revisa, analiza o descarga el estado de ventas</Header>
        <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
            <TablaVentas sortActive={true} />
        </StyleSheetManager>
    </>
  )
}

export default Ventas