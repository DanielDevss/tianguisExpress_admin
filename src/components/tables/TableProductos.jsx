import DataTable from "react-data-table-component"
import useProductos from "../../hooks/useProductos"
import CustomHeader from "./CustomHeader";
import { formatPriceMX, formatDate } from "../../utils/utils";
import { FaTrash, FaArrowUpRightFromSquare, FaStar, FaPercent } from "react-icons/fa6"
import { Link } from "react-router-dom";
import { useState } from "react";
import customStyles, { paginationOptions } from "../../utils/themeTables";
import LoaderContent from "../LoaderContent";
import { Modal } from "react-bootstrap";
const url = import.meta.env.VITE_URL;

const TableProductos = () => {

    const [modalDescuento, setModalDescuento] = useState(false);
    const [productoSelect, setProductoSelect] = useState({});
    const [filterText, setFilterText] = useState('');
    const {productos, eliminarProducto, actualizarEstado, destacarProducto, pending, crearDescuento} = useProductos();

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

        

    const columns = [
        {
            name: "Imagen",
            cell: (row) => <img src={`${url}${row.cover}`} className="rounded-circle m-3 border shadow-sm" width="50" />,
        },
        {
            name: "SKU",
            selector: (row) => row.sku,
            sortable: true
        },
        {
            name: "Producto",
            selector: (row) => row.titulo,
            sortable: true
        },
        {
            name: "Precio",
            selector: (row) => formatPriceMX(row.precio),
            sortable: true
        },
        {
            name: "Descuento",
            selector: (row) => row.descuento ? row.descuento : 0,
            sortable: true,
            cell: (row) => <span>{row.descuento ? row.descuento + " %" : "Sin descuento"}</span>
        },
        {
            name: "Fecha creación",
            selector: (row) => formatDate({datetime: row.fecha}).date,
            sortable: true
        },
        {
            name: "Publico",
            cell: (row) => {
                return(
                    <div className="form-check form-switch">
                        <input onInput={(e) => handleEstado(e, row.id)} type="checkbox" defaultChecked={row.estado === "activo" ? true : false} className="form-check-input" />
                        <label className={row.estado !== "activo" && "text-muted"}>{row.estado === "activo" ? "Activado" : "Desactivado"}</label>
                    </div>
                )
            },
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row) => {
                const id = row.id
                return (
                    <div className="btn-group">
                        <button onClick={() => handleDestacar(row.destacar, id)} className={`btn btn-outline-primary ${(row.destacar ==
                             1) && 'active'}`}><FaStar className="mb-1" />
                        </button>
                        
                        <button onClick={() => abrirModal(id)} className={`btn btn-outline-primary ${row.descuento && "active btn-outline-success" }`}><FaPercent className="mb-1" /></button>
                        
                        <button onClick={() => eliminarProducto(id)} className="btn btn-outline-primary"><FaTrash className="mb-1" /></button>
                        
                        <Link to={`${id}`} className="btn btn-outline-primary">
                            <FaArrowUpRightFromSquare className="mb-1" />
                        </Link>
                    </div>
                )
            },
            sortable:true
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
                        <button className="btn btn-success mt-3">Aplicar</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TableProductos;