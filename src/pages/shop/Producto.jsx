import IndiceNavegacion from "../../components/IndiceNavegacion";
import Header from "../../components/Header";
import useProducto from "../../hooks/useProducto";
import { nav_producto } from "../../utils/navegacionBreadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";

import "swiper/css"
import useCategorias from "../../hooks/useCategorias";
import { FaCheck, FaTrash } from "react-icons/fa6";

const Producto = () => {

    const url = import.meta.env.VITE_URL;
    const [openModal, setOpenModal] = useState(false);
    const [openModalVariantes, setOpenModalVariantes] = useState(false);
    const {producto, imagenes, variantes, agregarImagen, eliminarImagen, actualizarProducto, estadoUpd, pendingImage, agregarModelo, quitarModelo} = useProducto();
    const { categorias, subcategorias, seleccionarCategoria } = useCategorias()

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    
    const handleOpenModalV = () => setOpenModalVariantes(true);
    const handleCloseModalV = () => setOpenModalVariantes(false);

    const formulario = useRef();

    const handleFormSubmit = () => {
        const formData = new FormData(formulario.current);
        actualizarProducto({body: formData});
    }

    const handleChangeCategorias = (e) => {
        const categoria = e.target.value;
        seleccionarCategoria(categorias.filter(cat => cat.categoria === categoria)[0]);
    }

    useEffect(() => {
        if(categorias){
            seleccionarCategoria(categorias.filter(cat => cat.categoria === producto.categoria)[0]);
        }
    }, [categorias, producto])
    
  return (
    <>
        <Header titulo={`Detalles de producto`}>{producto.titulo}</Header>
        <div className="d-flex align-items-center justify-content-between mb-3">

            <IndiceNavegacion className={"mb-0"} navegacion={nav_producto} />

            <div className="d-flex gap-1">
                <button onClick={handleOpenModalV} className={`btn btn-outline-primary fw-bold ${estadoUpd && "disabled"}`}>
                    <span>Ver variantes</span>
                </button>

                <button onClick={handleFormSubmit} className={`btn fw-bold btn-primary ${estadoUpd && "disabled"}`}>
                    <span className={`${estadoUpd && "d-none"}`}>Aplicar cambios</span>
                    <span className={`spinner-border spinner-border-sm ${!estadoUpd && "d-none"}`}></span>
                </button>
            </div>

        </div>


        <article>

            <form onSubmit={actualizarProducto} ref={formulario}>
                
                <fieldset className="row card flex-row p-4">
                    <legend>Informacion del producto</legend>
                    <div className="col-3 mb-3">
                        <label className="fw-bold form-label" htmlFor="categoria">Categoría</label>
                        <select onChange={handleChangeCategorias} name="categoria" id="categoria" className="form-select">
                            {categorias && categorias.map(cat => (
                                <option selected={cat.categoria === producto.categoria ? true : false} value={cat.categoria} key={cat.categoria}>{cat.categoria}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-3 mb-3">
                        <label className="fw-bold form-label">Subcategoría</label>
                        <select name="subcategoria" className="form-select">
                            {subcategorias && subcategorias.map(sub => (
                                <option selected={producto.subcategoria === sub.subcategoria ? true : false} value={sub.subcategoria} key={sub.id}>{sub.subcategoria}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-3 mb-3">
                        <label className="fw-bold form-label">Nombre, Modelo o Variante</label>
                        <input name="nombre" type="text" className="form-control" defaultValue={producto.nombre} />
                    </div>
                    <div className="col-3 mb-3">
                        <label className="fw-bold form-label">Precio del producto</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input name="precio" type="number" className="form-control" defaultValue={producto.precio} />
                            <span className="input-group-text">MXN</span>
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <label className="fw-bold form-label">Titulo</label>
                        <input type="text" name="titulo" className="form-control" defaultValue={producto.titulo} />
                    </div>
                    <div className="col-3 mb-3">
                        <label className="fw-bold form-label">SKU</label>
                        <input name="sku" type="text" className="form-control" defaultValue={producto.sku} />
                    </div>
                    <div className="col-3 mb-3">
                        <label className="fw-bold form-label">Código</label>
                        <input name="codigo" type="text" className="form-control" defaultValue={producto.codigo} />
                    </div>
                    <div className="col-6 mb-3">
                        <label className="fw-bold form-label">Detalles del producto</label>
                        <textarea name="detalles" type="text" className="form-control" defaultValue={producto.detalles}></textarea>
                    </div>
                    <div className="col-6 mb-3">
                        <label className="fw-bold form-label">Información Extra</label>
                        <textarea name="mas_informacion" type="text" className="form-control" placeholder="Ingresa información extra acerca de este producto" defaultValue={producto.mas_informacion}></textarea>
                    </div>
                    <div className="col-4 mb-3">
                        <label className="form-label fw-bold">Alto, Ancho y Largo (Producto)</label>
                        <div className="input-group">
                            <input type="number" name="alto" defaultValue={producto.alto} placeholder="Altura" className="form-control" />
                            <input type="number" name="ancho" defaultValue={producto.ancho} placeholder="Ancho" className="form-control" />
                            <input type="number" name="largo" defaultValue={producto.largo} placeholder="Largo" className="form-control" />
                        </div>
                    </div>
                    <div className="col-4 mb-3">
                        <label className="form-label fw-bold">Alto, Ancho y Largo (Empaque)</label>
                        <div className="input-group">
                            <input type="number" name="emp_alto" defaultValue={producto.emp_alto} placeholder="Altura" className="form-control" />
                            <input type="number" name="emp_ancho" defaultValue={producto.emp_ancho} placeholder="Ancho" className="form-control" />
                            <input type="number" name="emp_largo" defaultValue={producto.emp_largo} placeholder="Largo" className="form-control" />
                        </div>
                    </div>
                    <div className="col-4 mb-3">
                        <label className="form-label fw-bold">Peso</label>
                        <div className="input-group">
                            <input type="number" name="peso" defaultValue={producto.peso} placeholder="Largo" className="form-control" />
                            <span className="input-group-text">Gramos</span>
                        </div>
                    </div>
                </fieldset>


                <fieldset>

                    <legend>Imagenes</legend>
                    <p className="text-muted lh-1">La primer imagen es la que se muestra en la tienda. Las demas imagenes son visibles al abrir el producto.</p>
                    <button onClick={handleOpenModal} type="button" className="btn btn-outline-primary mb-3">Agregar otra imagen</button>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        className="mb-4 w-100"
                    >
                        <SwiperSlide className="card">
                            <div className="card-body">
                                <figure className="ratio ratio-1x1">
                                    <img className="w-100 d-block" src={url + producto.cover} />
                                </figure>
                            </div>
                            <footer className="card-footer">
                                <input type="file" name="cover" className="form-control" />
                            </footer>
                        </SwiperSlide>

                        {imagenes.length > 0 && imagenes.map((img) => (
                            <SwiperSlide key={img.id} className="card">
                                <div className="card-body">
                                    <figure className="ratio ratio-1x1">
                                        <img className="w-100 d-block object-fit-contain" src={url + img.path} />
                                    </figure>
                                    {imagenes.length == 1 && <p className="text-muted" style={{fontSize:".8rem"}}>Debe haber al menos una imagen</p>}
                                    <button onClick={() => eliminarImagen(img.id)} type="button" className={`btn btn-danger ${imagenes.length == 1 && "disabled"}`}>Quitar</button>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </fieldset>
            </form>
        </article>

        {/* LINK MODAL AGREGAR IMAGENES */}
        <Modal show={openModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Imagen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="w-100" onSubmit={agregarImagen}>
                    <label className="form-label">Selecciona un producto</label>
                    <input type="file" name="image" className="form-control mb-3" />
                    <div className="d-flex gap-1">
                        <button type="button" className="btn btn-secondary">Cancelar</button>
                        <button className={`btn btn-primary ${pendingImage && "btn-secondary disabled"}`}>{pendingImage ? "Agregando..." : "Agregar"}</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>

        {/* LINK MODAL VARIANTES */}
        <Modal show={openModalVariantes} onHide={handleCloseModalV}>
            <Modal.Header closeButton>
                <Modal.Title>Variantes del producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(e) => agregarModelo(e, "agregar")} className="input-group">
                    <input type="text" placeholder="Ingresa una variante nueva aquí" name="variante" className="form-control" />
                    <button className="btn btn-primary">Agregar</button>
                </form>
                <hr />
                <ul className="list-group list-group-flush">
                    {variantes && variantes.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                            <form onSubmit={(e) => agregarModelo(e, "update", item.id)} className="d-flex justify-content-between w-100 gap-1">
                                <input type="text" name="variante" className="form-control fw-bold" defaultValue={item.variante} />
                                <div className="btn-group">
                                    <button onClick={() => quitarModelo(item.id)} type="button" className="btn btn-outline-danger"><FaTrash className="mb-1"/></button>
                                    <button type="submit" className="btn btn-outline-primary"><FaCheck className="mb-1"/></button>
                                </div>
                            </form>
                        </li>
                    ))}

                </ul>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Producto