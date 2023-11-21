import Header from "../components/Header"
import TableGuias from "../components/tables/TableGuias";

const Guias = () => {

    return (
        <>
            <Header titulo={"Guias de envío"}>Estas son las guías actuales, pero puedes agregar o quitar</Header>
            <TableGuias />
        </>
    )
}

export default Guias
