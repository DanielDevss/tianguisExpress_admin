import Header from "../components/Header"
import TableClientes from "../components/tables/TableClientes"

const Clientes = () => {
  return (
    <>
        <Header titulo={"Catálogo de clientes"}>Registro de clientes; compras por cliente, etc.</Header>
        <TableClientes />
    </>
  )
}

export default Clientes