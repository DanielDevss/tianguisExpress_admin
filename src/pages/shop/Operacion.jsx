import { Link } from "react-router-dom";
import Header from "../../components/Header"
import useOperaciones from "../../hooks/useOperaciones"
import useInventario from "../../hooks/useInventario";
import { useState, useContext, useEffect } from "react";
import {BsSearch} from "react-icons/bs"
import { Modal } from "react-bootstrap";
import {useForm} from "react-hook-form"
import {MdOutlineClose} from "react-icons/md"
import { FaClipboardCheck, FaPlus } from "react-icons/fa";
import {Spinner} from "react-bootstrap";
import { formatDate } from "../../utils/utils";
import IndiceNavegacion from "../../components/IndiceNavegacion";
import AuthContext from "../../Context/AuthContext";

const Operacion = () => {
    const [filtroText, setFiltroText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const {inventario} = useInventario();
    const [listaOpciones, setListaOpciones] = useState([]);
    const {agregarProducto, productosMovimiento, actualizarProducto, quitarProducto, actualizarOperacion, operacion, autorizarOperacion, loadSaveOP} = useOperaciones()
    const {rol, nombre} = useContext(AuthContext);

    const handleFilter = (e) => setFiltroText(e.target.value);

    const filtrado = listaOpciones.filter(model => model.variante.toLowerCase().includes(filtroText));
    const {register, formState:{errors}, handleSubmit} = useForm();
    const handleCloseModal = () => setOpenModal(false);

    const formSubmit = (data) => actualizarOperacion(data);
    const nav_operacion = [
        {
            label: "Inicio",
            to: "/",
            estado: null,
        },
        {
            label: "Inventario",
            to: "/inventario",
            estado: null,
        },
        {
            label: "Operacion de " + operacion.operacion,
            to: "/",
            estado: "active",
        },
    ]

    useEffect(() => {
        let nuevoArrayInventario = inventario.filter(producto => !productosMovimiento.some(operacion => operacion.id_inventario === producto.id));
        setListaOpciones(nuevoArrayInventario)
    }, [productosMovimiento, inventario]);

    return (
    <div>
        <Header titulo={`${operacion.operacion} de productos`}>ID Operacion: {operacion.id}</Header>
        <IndiceNavegacion navegacion={nav_operacion} />
        <section className="d-flex justify-content-between mb-3">
            {!operacion.autorizo && (
                <search className="w-50 input-group">
                    <span className="input-group-text"><BsSearch /></span>
                    <input onChange={handleFilter} type="search" className="form-control" placeholder="Buscar variante/modelo" />
                </search>
            )}
            <div className="d-flex gap-1">
                {!operacion.autorizo && (
                    <>
                        <button onClick={() => setOpenModal(true)} className="btn btn-success fw-bold">Guardar {operacion.operacion}</button>
                        {rol === "superadmin" && <button onClick={autorizarOperacion} className="btn btn-primary fw-bold">Autorizar {operacion.operacion}</button>}
                    </>
                )}
            </div>
        </section>

        <Modal show={openModal} onHide={handleCloseModal} >
            <Modal.Header closeButton>
                <Modal.Title>Completa la entrada</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="mb-3">
                        <label className={`form-label ${errors.operador?.type === "required" && "text-danger fw-bold"}`}>Tu nombre *</label>
                        <input defaultValue={operacion.operador ? operacion.operador : nombre} readOnly className="form-control" placeholder="Ingresa tu nombre" type="text" {...register("operador",{required: true})} />
                    </div>
                    <div className="mb-3 d-flex gap-1">
                        <div className="flex-grow-1">
                            <label className={`form-label ${errors.proveedor?.type === "required" && "text-danger fw-bold"}`}>Proveedor *</label>
                            <input defaultValue={operacion.proveedor} className="form-control" placeholder="Nombre del proveedor" type="text" {...register("proveedor",{required: true})} />
                        </div>
                        <div className="flex-grow-1">
                            <label className={`form-label ${errors.empresa?.type === "required" && "text-danger fw-bold"}`}>Empresa *</label>
                            <input defaultValue={operacion.empresa} className="form-control" placeholder="Empresa que provee" type="text" {...register("empresa",{required: true})} />
                        </div>
                    </div>
                    <div className="mb-3 d-flex gap-1">
                        <div className="flex-grow-1">
                            <label className={`form-label ${errors.no_documento?.type === "required" && "text-danger fw-bold"}`}>ID del documento *</label>
                            <input defaultValue={operacion.no_documento} className="form-control" placeholder="Número del documento" type="text" {...register("no_documento",{required: true})} />
                        </div>
                        <div className="flex-grow-1">
                            <label className={`form-label ${errors.documento?.type === "required" && "text-danger fw-bold"}`}>Documento *</label>
                            <input defaultValue={operacion.documento} className="form-control" placeholder="Tipo de documento" type="text" {...register("documento",{required: true})} />
                        </div>
                    </div>

                    <button className="btn btn-success fw-bold">

                        {loadSaveOP ? <Spinner as="span" animation="border" size="sm" role="status" /> : <FaClipboardCheck className="mb-1"/> }                         
                        <span className="ms-1">{loadSaveOP ? "Cuardando..." : "Guardar"}</span>

                    </button>
                </form>
            </Modal.Body>
        </Modal>

        {/* LINK CONTENIDO DE MOVIMIENTOS */}

        <article className="row">
            {!operacion.autorizo && (
                <section className="col-4 border-end" style={{maxHeight: "60vh"}}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Variante/Modelo</th>
                                <th>Stock actual</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filtrado.length > 0 ? filtrado.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.variante}</td>
                                <td className="fw-bold text-muted">{producto.stock}</td>
                                <td><button className="btn btn-primary" onClick={() => agregarProducto({id_inventario:producto.id})}><FaPlus className="mb-1"/></button></td>
                            </tr>
                        )): (
                            <tr>
                                <td colSpan={3}>No hay resultados</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </section>
            )}
            <section className={`${!operacion.autorizo ? "col-8" : "col-12"}`}>
                {operacion.autorizo && (
                    <section>
                        <h3>Finalizada</h3>
                        <ul className="list-unstyled">
                            <li>Autorizado por <b>{operacion.autorizo}</b></li>
                            <li>Operador <b>{operacion.operador}</b></li>
                            <li>Proveedor <b>{operacion.proveedor}</b> de la empresa <b>{operacion.empresa}</b></li>
                            <li><b className="text-upercamelcase">{operacion.documento}</b> con el número {operacion.no_documento}</li>
                            <li>Operación realizada el día {formatDate({datetime: operacion.fecha}).date} a las {formatDate({datetime: operacion.fecha}).time} horas</li>
                        </ul>
                    </section>
                )}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID Producto</th>
                            <th>Variante/Modelo</th>
                            <th>Cantidad</th>
                            {!operacion.autorizo && <th>Accion</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {productosMovimiento.length > 0 ?  productosMovimiento.map(producto => (
                            <tr key={producto.id}>
                                <td><Link>{producto.id_producto}</Link></td>
                                <td>{producto.variante}</td>
                                {!operacion.autorizo ? (
                                    <td><input onChange={(e) => actualizarProducto(e, {id: producto.id})} type="number" className="form-control disabled" defaultValue={producto.cantidad} /></td>
                                ):(
                                    <td>{operacion.operacion == "entrada" ? "Se agregaron " + producto.cantidad + " unidades" : "Se removieron " + producto.cantidad + " unidades"}</td>
                                )}
                                {!operacion.autorizo && (
                                    <td><button className="btn " onClick={() => quitarProducto({id:producto.id})} ><MdOutlineClose className="mb-1 fs-4 text-black-50" /></button></td>
                                )}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3}>Aún no hay productos, agregalos de la tabla izquierda</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </article>
    </div>
  )
}

export default Operacion