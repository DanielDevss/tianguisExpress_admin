import Header from "../../components/Header";
import { Link } from "react-router-dom";
import useVentas from "../../hooks/useVentas"
import { formatDate, formatPriceMX } from "../../utils/utils";
import { FaMapLocationDot, FaClipboardUser, FaBagShopping } from "react-icons/fa6";
import { Tabs, Tab } from "react-bootstrap";
const Venta = () => {
    const {venta, productosVendidos} = useVentas();
    if(Object.keys(venta).length == 0){
        return;
    }
    return (
        <>
        <Header titulo={`Información de venta`}>
            Compra efectuada el {formatDate({datetime: venta.fecha_venta}).date} a las {formatDate({datetime: venta.fecha_venta}).time}
        </Header>

        <Tabs variant="tabs" className="">
            <Tab eventKey={"Detalles"} title={<span className="fw-bold text-black"><FaBagShopping className="mb-1 fs-5" /> Detalles de compra</span>}>
                <ul className="list-group mt-3 list-group-flush">
                    <li className="list-group-item"><b>ID de venta: </b><br />{venta.id}</li>
                    <li className="list-group-item"><b>Payment Intent ID: </b><a target="_blank" rel="noreferrer" className="nav-link link-primary" href={`mailto:${venta.correo}`}>{venta.payment_intent_id}</a></li>
                    <li className="list-group-item"><b>Client Secret: </b><br />{venta.client_secret}</li>
                    <li className="list-group-item"><b>Descuento por cúpon: </b><br />{venta.cupon_descuento > 0 ? formatPriceMX(venta.monto_descuento) + " MX" : "No se ingreso cúpon"}</li>
                    <li className="list-group-item"><b>Cantidad de pago: </b><br />Subtotal: {formatPriceMX(venta.monto_total)} <br />Costo envio: {formatPriceMX(venta.costo_envio || 0)} <br /> Monto total: {formatPriceMX(venta.costo_envio + venta.monto_total)}</li>
                    <li className="list-group-item d-flex flex-column">
                        <b className="mb-1">Número de Guía</b>
                        <p className="mb-0 lh-1">{venta.numero_envio ? venta.numero_envio : "No se genero una guía"}</p>
                        <a download={"Etiqueta de envío.pdf"} rel="noreferrer" target="_blank" href={venta.etiqueta_url}>{venta.etiqueta_url ? "Descargar etiqueta" : "No se genero una etiqueta"}</a>
                    </li>
                    <li className="list-group-item"><b>Productos comprados: </b><br />{venta.cantidad_total_productos} {venta.cantidad_total_productos > 1 ? "productos" : "producto"}</li>
                </ul>
            </Tab>
            <Tab eventKey={"Cliente"} title={<span className="fw-bold text-black"><FaClipboardUser className="mb-1 fs-5" /> Información del cliente</span>}>
                <ul className="list-group mt-3 list-group-flush">
                    <li className="list-group-item"><b>Cliente: </b><br />{venta.nombre}</li>
                    <li className="list-group-item"><b>Correo: </b><a className="nav-link link-primary" href={`mailto:${venta.correo}`}>{venta.correo}</a></li>
                    <li className="list-group-item"><b>Télefono: </b>{venta.telefono}</li>
                </ul>
            </Tab>
            <Tab eventKey={"Direccion"} title={<span className="fw-bold text-black"><FaMapLocationDot className="mb-1 fs-5" /> Dirección de envío</span>}>
                <ul className="list-group mt-3 list-group-flush">
                    <li className="list-group-item"><b>Calle y número: </b><br />{`${venta.calle} No.${venta.no_ext}, Int.${venta.no_int ? venta.no_int : "S/N"}`}</li>
                    <li className="list-group-item"><b>Colonia y CP: </b>{venta.colonia}, CP.{venta.cp}</li>
                    <li className="list-group-item"><b>Ciudad y Estado: </b>{venta.ciudad}, {venta.estado}</li>
                    <li className="list-group-item"><b>Entre calle: </b>{venta.calle_ref_1 ? venta.calle_ref_1 : "No ingreso calle de referencia"}</li>
                    <li className="list-group-item"><b>Entre calle: </b>{venta.calle_ref_2 ? venta.calle_ref_2 : "No ingreso calle de referencia"}</li>
                    <li className="list-group-item"><b>Referencias: </b>{venta.referencia ? venta.referencia : "No ingreso más referencias"}</li>
                </ul>
            </Tab>
        </Tabs>
 
        <section className="card mt-5">
            <header className="card-header">
                <h2 className="h4">Productos comprados</h2>
            </header>
            <article className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Inventario</th>
                                <th>ID Producto</th>
                                <th>Variante/Modelo</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosVendidos && productosVendidos.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id_inventario}</td>
                                    <td><Link className="nav-link link-primary" to={`/productos/${item.id_producto}`}>{item.id_producto}</Link></td>
                                    <td>{item.variante}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{formatPriceMX(item.subtotal)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
        </>
    )
}

export default Venta