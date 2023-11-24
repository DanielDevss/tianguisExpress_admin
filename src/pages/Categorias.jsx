import Header from "../components/Header";
import { useForm } from "react-hook-form";
import useCategorias from "../hooks/useCategorias"
const Categorias = () => {

  const {categorias, subcategorias, categoriaSelect, agregarCategoria, agregarSubcategoria, seleccionarCategoria} = useCategorias()
  const {register:registerCat, formState:{errors:errrosCat}, handleSubmit:handleSubmitC} = useForm();
  const {register:registerSub, formState:{errors:errrosSub}, handleSubmit:handleSubmitS} = useForm();

  const handleSubmitCat = (data) => {
      agregarCategoria(data);
  }; 
  const handleSubmitSub = (data) => {
      agregarSubcategoria(data);
  }; 
  return (
    <>
      <Header titulo={"Categorías y Subcategorías"}>Gestiona las categorías y subcategorias de productos</Header>
      <section className="row">
        <div className="col-6">
          <div className="card">
            <header className="card-header">
              <h3 className="text-uppercase h5 mb-0">Categorías</h3>
            </header>
            <div className="card-body">
              <form onSubmit={handleSubmitC(handleSubmitCat)}>
                <label className="form-label h5">Agrega una nueva categoría</label>
                <div className="input-group">
                  <input placeholder="Ingresa una categoría" type="text" className="form-control" {...registerCat("categoria", { required: true })} />
                  <button className="btn btn-primary">Agregar</button>
                </div>
                {errrosCat.categoria?.type === "required" && <span className="d-block text-danger">Agrega el nombre de la categoría</span>}
              </form>
              <hr />
              <h4 className="fs-5 mt-3">Selecciona una categoria</h4>
              <p className="text-muted">Selecciona una categoria para ver sus subcategorías en el panel derecho</p>
              <ul className="list-group list-group-flush mt-3">
                {categorias && categorias.map(item => (
                  <li key={item.id} onClick={() => seleccionarCategoria(item)} className="list-group-item list-group-item-action">
                    {item.categoria}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


        <div className="col-6">
          <div className="card">
            <header className="card-header">
              <h3 className="text-uppercase h5 mb-0">Subcategorías</h3>
            </header>
            <div className="card-body">
              {categoriaSelect.categoria ? (
                <>
                  <form onSubmit={handleSubmitS(handleSubmitSub)}>
                    <label className="form-label h5">Agrega una subcategoría nueva para: {categoriaSelect.categoria}</label>
                    <div className="input-group">
                      <input placeholder="Ingresa la subcategoria" type="text" className="form-control" {...registerSub("subcategoria", { required: true })} />
                      <button className="btn btn-primary">Agregar</button>
                    </div>
                    {errrosSub.subcategoria?.type === "required" && <span className="d-block text-danger">Agrega el nombre de la categoría</span>}
                  </form>
                  <hr />
                  {subcategorias.length > 0 ? (
                    <>
                      <h4 className="fs-5">Gestiona las subcategorìas</h4>
                      <p className="text-muted">Subcategorías actuales de {categoriaSelect.categoria}</p>
                      <ul className="list-group list-group-flush mt-3">
                        {subcategorias && subcategorias.map(item => (
                          <li key={item.id} className="list-group-item list-group-item-action">
                            {item.subcategoria}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : <span className="mt-3 d-block text-center text-muted">No se han añadido subcategorias en {categoriaSelect.categoria}</span>}
                </>
              ) : "Selecciona primero una categoría"}

            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Categorias