import DataTable, {createTheme} from "react-data-table-component"
import CustomHeader from "./CustomHeader"
import tableTheme from "../../utils/themeTables.js"
import useInventario from "../../hooks/useInventario"
import { Link } from "react-router-dom";
import { useState } from "react";

createTheme('tableTheme', tableTheme);

const TableInventario = () => {
    
    const {inventario} = useInventario();
    const [filterTable, setFilterTable] = useState('');

    const columns = [
        {
            name: "ID Producto",
            cell: (row) => <Link to={"/productos/" + row.id_producto}>{row.id_producto}</Link> ,
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
    <DataTable theme="tableTheme" title={<CustomHeader searchOnChange={handleSearch} placeholder="Busca el modelo" title="Inventario de productos" />} btnAdd={false} columns={columns} pagination data={filterInventario} responsive />
  )
}

export default TableInventario