import DataTable from "react-data-table-component"
import useProductos from "../../hooks/useProductos"
import CustomHeader from "./CustomHeader";
import { formatPriceMX } from "../../utils/utils";
import { FaTrash, FaPencil, FaStar, FaPercent } from "react-icons/fa6"
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import customStyles, { paginationOptions } from "../../utils/themeTables";
import LoaderContent from "../LoaderContent";
import { Modal } from "react-bootstrap";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

const url = import.meta.env.VITE_URL;

const TableProductos = () => {

    const [modalDescuento, setModalDescuento] = useState(false);
    const [productoSelect, setProductoSelect] = useState({});
    const [filterText, setFilterText] = useState('');
    const {productos, eliminarProducto, actualizarEstado, destacarProducto, pending, crearDescuento, eliminarDescuento} = useProductos();

    const abrirModal = (id) => {
        const producto = productos.filter(item => item.id === id)[0];
        setProductoSelect(producto);
        setModalDescuento(true)
    };
    const cerrarModal = () => setModalDescuento(false);


    const handleEstado = (e, id) => {
        const input = e.target;
        const estado = input.checked ? "activo" : "inactivo";
        actualizarEstado({estado, id});
    }

    const productosModificados = productos.map(producto => {
        const { cover, detalles, mas_informacion, tipo_descuento, destacar, descuento, ...productoSinCamposNoDeseados } = producto;
        const esDestacado = destacar === 1 ? "Destacado" : "No destacado";
        const discount = descuento ? descuento : 0;

        return {
            ...productoSinCamposNoDeseados,
            Descuento: discount,
            Destacado: esDestacado,
        };
      });

    const handleDestacar = (value, id) => {
        const destacar = value == 0 ? 1 : 0;
        destacarProducto({destacar ,id});
    }
 
    const optionsDownload = {
        data: productosModificados,
        filename: `Productos`,
        sheetname: "Productos"
    }

    const ActionsCell = (row) => {

        const {id} = row;
        const btnDestacar = useRef(null);
        const btnDescuento = useRef(null);
        const btnEliminar = useRef(null);
        const btnAbrir = useRef(null);
        useEffect(() => {
            tippy(btnDestacar.current, {content: "Destacar producto"});
            tippy(btnDescuento.current, {content: "Agregar descuento"});
            tippy(btnEliminar.current, {content: "Eliminar producto"});
            tippy(btnAbrir.current, {content: "Abrir y editar producto"});
        }, [])

        return (
            <div className="btn-group">
                <button ref={btnDestacar} onClick={() => handleDestacar(row.destacar, id)} className={`btn btn-outline-primary ${(row.destacar ==
                     1) && 'active'}`}><FaStar className="mb-1" />
                </button>
                
                <button ref={btnDescuento} onClick={() => abrirModal(id)} className={`btn btn-outline-primary ${row.descuento && "active btn-outline-success" }`}><FaPercent className="mb-1" /></button>
                
                <button ref={btnEliminar} onClick={() => eliminarProducto(id)} className="btn btn-outline-primary"><FaTrash className="mb-1" /></button>
                
                <Link ref={btnAbrir} to={`${id}`} className="btn btn-outline-primary">
                    <FaPencil className="mb-1" />
                </Link>
            </div>
        )
    }

    const columns = [
        {
            name: "Imagen",
            cell: (row) => <img src={`${url}${row.cover}`} className="rounded-circle m-3 border shadow-sm" width="50" />,
            maxWidth: "75px"
        },
        {
            name: "SKU",
            selector: (row) => row.sku,
            sortable: true,
            width: "130px"
        },
        {
            name: "ID",
            selector: (row) => row.id,
            minWidth: "140px"
        },
        {
            name: "Producto",
            selector: (row) => row.titulo,
            sortable: true,
            minWidth: "250px",
        },
        {
            name: "Precio",
            selector: (row) => formatPriceMX(row.precio),
            sortable: true,
            minWidth: "130px"
        },
        {
            name: "Descuento",
            selector: (row) => row.descuento ? row.descuento : 0,
            sortable: true,
            width: "130px",
            cell: (row) => <span>{row.descuento ? row.descuento + " %" : "No"}</span>
        },
        {
            name: "Publico",
            cell: (row) => {
                return(
                    <div className="form-check m-auto form-switch">
                        <input onInput={(e) => handleEstado(e, row.id)} type="checkbox" defaultChecked={row.estado === "activo" ? true : false} className="form-check-input" />
                    </div>
                )
            },
            maxWidth: "120px",
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row) => ActionsCell(row),
            sortable:true,
            minWidth: "140px",
        }
    ]

    const filteredProductos = productos.filter(
        (producto) =>
            producto.titulo.toLowerCase().includes(filterText.toLowerCase()) ||
            producto.nombre.toLowerCase().includes(filterText.toLowerCase())
    );

    const searchOnChange = (e) => {
        setFilterText(e.target.value);
    }


    return (
        <>
            <DataTable progressPending={pending} progressComponent={<LoaderContent />} paginationComponentOptions={paginationOptions} customStyles={customStyles} highlightOnHover searchable title={<CustomHeader downloadOptions={optionsDownload} searchOnChange={searchOnChange} btnAdd={true} toBtnAdd={"/nuevo-producto"} placeholder="Buscar producto" title="Productos registrados" />} columns={columns} pagination data={filteredProductos} />
            <Modal show={modalDescuento} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar descuento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => crearDescuento(e, productoSelect.id)} noValidate>
                        <label className="form-label fw-bold">Descuento:</label>
                        <input defaultValue={productoSelect.descuento} type="number" name="descuento" placeholder="Ingresa el porcentaje" className="form-control"/>
                        <div className="d-flex gap-1">
                            <button type="button" className="btn btn-danger mt-3" onClick={() => eliminarDescuento(productoSelect.id, cerrarModal)}>Quitar</button>
                            <button className="btn btn-success mt-3">Aplicar</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TableProductos;