import DataTable from "react-data-table-component"
import CustomHeader from "./CustomHeader"
import customStyles, {paginationOptions} from "../../utils/themeTables.js"
import useInventario from "../../hooks/useInventario"
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import LoaderContent from "../LoaderContent.jsx"

const TableInventario = () => {
    
    const {inventario, pending} = useInventario();
    const [filterTable, setFilterTable] = useState('');


    const optionsDownload = {
        data: inventario,
        filename: "Reporte_inventario",
        sheetname: "Reporte inventario"
    }

    const columns = [
        {
            name: "ID Producto",
            cell: (row) => <Link to={"/productos/" + row.id_producto}>{row.id_producto} <FaArrowUpRightFromSquare className="fs-5 ms-1 mb-1" /></Link> ,
            selector: (row) => row.id_producto,
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
            sortable: true,
        }
    ]

    const handleSearch = (e) => {
        setFilterTable(e.target.value);
    }

    const filterInventario = inventario.filter(model => model.variante.toLowerCase().includes(filterTable.toLowerCase()));

  return (
    <DataTable progressPending={pending} progressComponent={<LoaderContent />} highlightOnHover customStyles={customStyles} paginationComponentOptions={paginationOptions} title={<CustomHeader downloadOptions={optionsDownload} searchOnChange={handleSearch} placeholder="Busca el modelo" title="Inventario de productos" />} btnAdd={false} columns={columns} pagination data={filterInventario} responsive />
  )
}

export default TableInventario