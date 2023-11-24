import Header from "../../components/Header";
import useClientes from "../../hooks/useClientes"
import { Tabs, Tab } from "react-bootstrap";
import TableComprasCliente from "../../components/tables/TableComprasCliente";
import { formatDate, formatPriceMX } from "../../utils/utils";
import { Link } from "react-router-dom";

const Cliente = () => {
    
    const {cliente, ventaMaxima, compras} = useClientes();

    if(!Object.keys(cliente).length > 0 || !Object.keys(ventaMaxima).length > 0 || !Object.keys(compras) > 0 ){
        return;
    }

    console.log(ventaMaxima)

  return (
    <div>
        <Header titulo={"Cliente"} />
        <Tabs className="mb-3">
            <Tab eventKey={"cliente"} title={<span className="fw-bold link-dark">Información del cliente</span>}>
                <h3 className="h4 ps-3 mb-3">Información básica</h3>
                <ul className="list-group mb-5 list-group-flush">
                    <li className="list-group-item"><b>ID de cliente: </b>{cliente.id}</li>
                    <li className="list-group-item"><b>Nombre completo: </b>{cliente.nombre}</li>
                    <li className="list-group-item"><b>Correo: </b><a href={`mailto:${cliente.correo}`}>{cliente.correo}</a></li>
                    <li className="list-group-item"><b>Teléfono: </b>{cliente.telefono}</li>
                </ul>
                <h3 className="h4 ps-3 mb-3">Detalles de compras</h3>
                <ul className="list-group mb-5 list-group-flush">
                    <li className="list-group-item"><b>Ganancias totales por el cliente: </b>{formatPriceMX(cliente.total_gastado)}</li>
                    <li className="list-group-item"><b>Compras realizadas: </b>{cliente.total_compras}</li>
                    <li className="list-group-item"><b>Monto de su mejor compra: </b>{formatPriceMX(cliente.monto_max_sale)}</li>
                </ul>
                <h3 className="h4 ps-3 mb-3">Domicilio</h3>
                <ul className="list-group mb-5 list-group-flush">
                    <li className="list-group-item"><b>Calle: </b>{cliente.calle + " Ext." + cliente.no_ext + " Int." + cliente.no_int}</li>
                    <li className="list-group-item"><b>Colonia: </b>{cliente.colonia}</li>
                    <li className="list-group-item"><b>Codigo postal: </b>{cliente.cp}</li>
                    <li className="list-group-item"><b>Ciudad: </b>{cliente.ciudad}</li>
                    <li className="list-group-item"><b>Estado: </b>{cliente.estado}</li>
                </ul>
            </Tab>
        
            <Tab eventKey={"compra_max"} title={<span className="fw-bold link-dark">Mejor compra</span>}>
                <h3 className="h4 ps-3 mb-3">Detalles de su mejor compra</h3>
                <ul className="list-group mb-5 list-group-flush">
                    <li className="list-group-item"><b>ID de venta: </b>{ventaMaxima.id}</li>
                    <li className="list-group-item"><b>Payment ID: </b>{ventaMaxima.payment_intent_id}</li>
                    <li className="list-group-item"><b>Monto vendido: </b>{formatPriceMX(ventaMaxima.monto_total)}</li>
                    <li className="list-group-item"><b>Cantidad de productos: </b>{ventaMaxima.productos.length} productos comprados</li>
                    <li className="list-group-item"><b>Fecha de compra: </b>{formatDate({datetime: ventaMaxima.fecha_venta}).date}</li>
                    <li className="list-group-item"><Link to={`/ventas/${ventaMaxima.id}`}>Abrir venta</Link></li>
                </ul>
            </Tab>
        </Tabs>

        <section className="">
            <TableComprasCliente data={compras} />
        </section>
    </div>
  )
}

export default Cliente