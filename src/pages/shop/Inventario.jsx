import Header from "../../components/Header"
import IndiceNavegacion from "../../components/IndiceNavegacion"
import TableInventario from "../../components/tables/TableInventario"
import TableMovimientos from "../../components/tables/TableMovimientos"
import { StyleSheetManager } from "styled-components"
import { Tab, Tabs } from "react-bootstrap"
import { nav_inventario } from "../../utils/navegacionBreadcrumb"
import useInventario from "../../hooks/useInventario"

const Inventario = () => {

  const {crearEntrada, crearSalida} = useInventario();

  return (
    <div>
      <Header titulo={"Inventario de productos"}>Gestiona la salida y entrada de productos</Header>
      <IndiceNavegacion navegacion={nav_inventario} />
      
      <Tabs variant="tabs">
        <Tab eventKey={"stock"} title="Inventario">
          <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
            <TableInventario sortActive={true} />
          </StyleSheetManager>
        </Tab>
        <Tab eventKey={"movimientos"} title="Moviemientos">
          <div className="d-flex gap-1 my-3">
            <button className="btn btn-primary fw-bold" onClick={crearEntrada}>Crear entrada</button>
            <button className="btn btn-primary fw-bold" onClick={crearSalida}>Crear salida</button>
          </div>

          <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
            <TableMovimientos sortActive={true} />
          </StyleSheetManager>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Inventario
