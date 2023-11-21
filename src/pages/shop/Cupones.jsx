import Header from "../../components/Header";
import TablaCupones from "../../components/tables/TablaCupones";
const Cupones = () => {
  return (
    <div>
        <Header titulo={"Cupones de descuento"}>Estos cupones generando descuento de precio o porcentaje</Header>
        <TablaCupones />
    </div>
  )
}

export default Cupones
