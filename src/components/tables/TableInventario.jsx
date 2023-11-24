import DataTable from "react-data-table-component"
import CustomHeader from "./CustomHeader"
import customStyles, {paginationOptions} from "../../utils/themeTables.js"
import useInventario from "../../hooks/useInventario"
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6"
import LoaderContent from "../LoaderContent.jsx"

const TableInventario = () => {
    
    const {inventario, pending, actualizarStockMinimo} = useInventario();
    const [filterTable, setFilterTable] = useState('');

    const optionsDownload = {
        data: inventario,
        filename: "Reporte_inventario",
        sheetname: "Reporte inventario"
    }

    const columns = [
        {
            name: "Producto",
            cell: (row) => <Link className="nav-link" to={"/productos/" + row.id_producto}>{row.titulo}</Link> ,
            selector: (row) => row.titulo,
            sortable: true
        },
        {
            name: "Modelo o variante",
            selector: (row) => row.variante,
            sortable: true
        },
        {
            name: "Stock Actual",
            selector: (row) => row.stock,
            sortable: true,
        },
        {
            name: "Stock Minimo",
            selector: (row) => row.stock_min,
            cell: (row) => <form onSubmit={(e) => actualizarStockMinimo(e,row.id)} className="input-group"><input type="number" name="stock_min" className="form-control bg-tra" defaultValue={row.stock_min} /><button className="btn btn-primary"><FaCheck /></button></form>,
            sortable: true,
        }
    ]

    const handleSearch = (e) => {
        setFilterTable(e.target.value);
    }

    const condicionalRows = [
        {
            when: (row) => (row.stock) == row.stock_min,
            style: {
                backgroundColor: "#ffbb0049"
            }
        },
        {
            when: (row) => (row.stock) < row.stock_min,
            style: {
                backgroundColor: "#ff33007b",
            }
        },
        {
            when: (row) => row.stock <= 0,
            style: {
                backgroundColor: "#ff3300be",
                color: "#fff"
            }
        }
    ]

    const filterInventario = inventario.filter(model => model.variante.toLowerCase().includes(filterTable.toLowerCase()));

  return (
    <DataTable conditionalRowStyles={condicionalRows} progressPending={pending} progressComponent={<LoaderContent />} highlightOnHover customStyles={customStyles} paginationComponentOptions={paginationOptions} title={<CustomHeader downloadOptions={optionsDownload} searchOnChange={handleSearch} placeholder="Busca el modelo" title="Inventario de productos" />} btnAdd={false} columns={columns} pagination data={filterInventario} responsive />
  )
}

export default TableInventario