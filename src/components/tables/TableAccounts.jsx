import DataTable from "react-data-table-component";
import customStyles, {paginationOptions} from "../../utils/themeTables.js";
import useAccounts from "../../hooks/useAccounts.js";
import {FaTrash} from "react-icons/fa6";
import Select from "react-select";
import { useState } from "react";


const TableAccounts = () => {
    
    const { accounts, cambiarRol, eliminar } = useAccounts();

    const SelectedCell = ({ rol, id }) => {
        const optionsSelect = [
          { value: "superadmin", label: "Super Admin" },
          { value: "admin", label: "Administrador" },
          { value: "contador", label: "Contador" },
        ];
      
        // Inicializa el estado con la opción correspondiente al rol actual
        const [selectedOption, setSelectedOption] = useState(
          optionsSelect.find((opt) => opt.value === rol)
        );
      
        // Handler para el cambio de selección
        const handleChange = (selectedOption) => {
          setSelectedOption(selectedOption);
          // Llama a la función para cambiar el rol pasando el nuevo rol y el id
          cambiarRol(selectedOption.value, id);
        };
      
        return (
          <Select
            className="w-100"
            onChange={handleChange}
            value={selectedOption}
            options={optionsSelect}
          />
        );
      };
      

    const columns = [
        {
            name : "Correo eléctronico",
            selector : (row) => row.correo,
            sortable: true,
        },
        {
            name : "Nombre completo",
            selector : (row) => row.nombre,
            sortable: true,
        },
        {
            name: "Rol asignado",
            sortable: true,
            selector: (row) => row.rol,
            maxWidth: "350px",
            cell: (row) => <SelectedCell rol={row.rol} id={row.id} />
        },
        {
            name: "Acciones",
            cell: (row) => {
                return (
                    <div className="btn btn-group">
                        <button className="btn btn-outline-danger" onClick={() => eliminar(row.id)}><FaTrash/></button>
                    </div>
                )
            }
        }
    ];

  return (
    <div>
        <DataTable data={accounts} highlightOnHover columns={columns} customStyles={customStyles} paginationComponentOptions={paginationOptions} />
    </div>
  )
}

export default TableAccounts