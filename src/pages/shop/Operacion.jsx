import { Link } from "react-router-dom";
import Header from "../../components/Header"
import useOperaciones from "../../hooks/useOperaciones"
import useInventario from "../../hooks/useInventario";
import { useState } from "react";
import {BsSearch} from "react-icons/bs"
import { Modal } from "react-bootstrap";
import {useForm} from "react-hook-form"
import {MdOutlineClose} from "react-icons/md"
import {FaPlus} from "react-icons/fa"

const Operacion = () => {
    const [filtroText, setFiltroText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const {inventario} = useInventario();
    const {agregarProducto, productosMovimiento, actualizarProducto, quitarProducto, actualizarOperacion, operacion} = useOperaciones()
    
    const handleFilter = (e) => setFiltroText(e.target.value);

    const filtrado = inventario.filter(model => model.variante.toLowerCase().includes(filtroText));
    const {register, formState:{errors}, handleSubmit} = useForm();
    const handleCloseModal = () => setOpenModal(false);

    const formSubmit = (data) => actualizarOperacion(data);

    return (
    <div>
        <Header titulo={`${operacion.operacion} de productos`}>ID Operacion: {operacion.id}</Header>
        <section className="d-flex justify-content-between mb-3">
            <search className="w-50 input-group">
                <span className="input-group-text"><BsSearch /></span>
                <input onChange={handleFilter} type="search" className="form-control" placeholder="Buscar variante/modelo" />
            </search>
            <div className="d-flex gap-1">
                <button onClick={() => setOpenModal(true)} className="btn btn-success fw-bold">Guardar entrada</button>
                <button className="btn btn-primary fw-bold">Autorizar entrada</button>
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
                        <input defaultValue={operacion.operador} className="form-control" placeholder="Ingresa tu nombre" type="text" {...register("operador",{required: true})} />
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

                    <button className="btn btn-success fw-bold">Listo</button>
                </form>
            </Modal.Body>
        </Modal>

        {/* LINK CONTENIDO DE MOVIMIENTOS */}

        <article className="row">
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
            <section className="col-8">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID Producto</th>
                            <th>Variante/Modelo</th>
                            <th>Cantidad</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosMovimiento.length > 0 ?  productosMovimiento.map(producto => (
                            <tr key={producto.id}>
                                <td><Link>{producto.id_producto}</Link></td>
                                <td>{producto.variante}</td>
                                <td><input onChange={(e) => actualizarProducto(e, {id: producto.id})} type="number" className="form-control" defaultValue={producto.cantidad} /></td>
                                <td><button className="btn " onClick={() => quitarProducto({id:producto.id})} ><MdOutlineClose className="mb-1 fs-4 text-black-50" /></button></td>
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