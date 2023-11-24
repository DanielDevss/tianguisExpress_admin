import Header from "../../components/Header"
import IndiceNavegacion from "../../components/IndiceNavegacion"
import TableInventario from "../../components/tables/TableInventario"
import TableMovimientos from "../../components/tables/TableMovimientos"
import { StyleSheetManager } from "styled-components"
import { Tab, Tabs } from "react-bootstrap"
import { nav_inventario } from "../../utils/navegacionBreadcrumb"
import useInventario from "../../hooks/useInventario"
import { FaWarehouse } from "react-icons/fa6"
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { PiArrowsDownUpBold } from "react-icons/pi";
const Inventario = () => {

  const {crearEntrada, crearSalida} = useInventario();

  return (
    <div>
      <Header titulo={"Inventario de productos"}>Gestiona la salida y entrada de productos</Header>
      <IndiceNavegacion navegacion={nav_inventario} />
      
      <Tabs variant="tabs">
        <Tab eventKey={"stock"} title={<span className="fw-bold link-dark px-4"><FaWarehouse className="mb-1" /> Inventario</span>}>
          <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
            <TableInventario sortActive={true} />
          </StyleSheetManager>
        </Tab>
        <Tab eventKey={"movimientos"} title={<span className="fw-bold link-dark px-4"><PiArrowsDownUpBold className="mb-1" /> Movimientos</span>}>
          <div className="d-flex gap-1 my-3">
            <button className="btn btn-primary fw-bold" style={{width: "200px"}} onClick={crearEntrada}><IoIosLogIn className="fs-4" /> Crear entrada</button>
            <button className="btn btn-danger fw-bold" style={{width: "200px"}} onClick={crearSalida}><IoIosLogOut className="fs-4" /> Crear salida</button>
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
