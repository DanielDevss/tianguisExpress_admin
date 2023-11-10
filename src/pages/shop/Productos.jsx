import Header from "../../components/Header"
import IndiceNavegacion from "../../components/IndiceNavegacion"
import { nav_productos } from "../../utils/navegacionBreadcrumb"
import TableProductos from "../../components/tables/TableProductos"
import {StyleSheetManager} from "styled-components";

const Productos = () => {

    return (
        <>
            <Header titulo="Productos">Estos son todos los productos que tienes registrados</Header>
            <IndiceNavegacion navegacion={nav_productos} />
            <StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
                <TableProductos sortActive={true} />
            </StyleSheetManager>
        </>
    )
}

export default Productos