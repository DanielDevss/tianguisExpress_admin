import Header from "../components/Header";
import { Modal } from "react-bootstrap";
import useCategorias from "../hooks/useCategorias"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
const Categorias = () => {

  const [ modalCat, setModalCat ] = useState(false);
  const [ modalSub, setModalSub ] = useState(false);
  const [ catSelectModal, setCatSelectModal ] = useState({});
  const [ subSelectModal, setSubSelectModal ] = useState({});

  // MODAL CATEGORIAS

  const handleCloseModalCat = () => setModalCat(false);
  const handleOpenModalCat = (data) => {
    console.table(data);
    setCatSelectModal(data)
    setModalCat(true);
  };
  
  // MODAL SUBCATEGORIAS

  const handleCloseModalSub = () => setModalSub(false);
  const handleOpenModalSub = (data, categoria) => {
    console.log(data);
    setSubSelectModal({
      id: data.id,
      subcategoria: data.subcategoria,
      categoria
    });
    setModalSub(true);
  }

  // CONSUMIENDO HOOKS

  const { 
    eliminarCategoria,
    eliminarSubcategoria,
    actualizarCategoria,
    actualizarSubcategoria,
    categorias,
    subcategorias,
    categoriaSelect,
    agregarCategoria,
    agregarSubcategoria,
    seleccionarCategoria } = useCategorias()

  const {register:registerCat, setValue:setValueC, formState:{errors:errrosCat}, handleSubmit:handleSubmitC} = useForm();
  const {register:registerSub, setValue:setValueS, formState:{errors:errrosSub}, handleSubmit:handleSubmitS} = useForm();

  // ACCIONES DE CATEOGORIAS

  const handleUpdateCategoria = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    actualizarCategoria({formData, categoria: catSelectModal.categoria, id: catSelectModal.id});
  }

  const handleDeleteCategoria = (data) => {
    eliminarCategoria(data);
  }

  // ACCIONES DE SUBCATEGORIAS

  const handleDeleteSubcategoria = (data,categoria) => {
    const body = {
      id: data.id,
      subcategoria: data.subcategoria,
      categoria: categoria
    }
    eliminarSubcategoria(body);
  }

  const handleUpdateSubcategoria = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("categoria", subSelectModal.categoria);
    actualizarSubcategoria({data: subSelectModal, formData});
  }


  // SUBMITS

  const handleSubmitCat = (data) => {
      agregarCategoria(data);
      setValueC("categoria", null)
  }; 
  const handleSubmitSub = (data) => {
      agregarSubcategoria(data);
      setValueS("subcategoria", null)
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

                  <li key={item.id} className="list-group-item list-group-item-action d-flex align-items-center">
                    <div className="d-flex gap-1 me-2">
                      <button onClick={() => handleDeleteCategoria(item)} className="btn btn-sm btn-danger"><FaTrash className="mb-1" /></button>
                      <button onClick={() => handleOpenModalCat(item)} className="btn btn-sm btn-primary"><FaPenToSquare className="mb-1" /></button>
                    </div>
                    <span style={{cursor:"pointer"}} className="d-block w-100 py-1 fw-bold text-muted" onClick={() => seleccionarCategoria(item)}>
                      {item.categoria}
                    </span>
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

                          <li key={item.id} className="list-group-item list-group-item-action d-flex align-items-center">
                            <div className="d-flex gap-1 me-2">
                              <button onClick={() => handleDeleteSubcategoria(item, categoriaSelect.categoria)} className="btn btn-sm btn-danger"><FaTrash className="mb-1" /></button>
                              <button onClick={() => handleOpenModalSub(item, categoriaSelect.categoria)} className="btn btn-sm btn-primary"><FaPenToSquare className="mb-1" /></button>
                            </div>
                            <span className="fw-bold py-1 text-muted">{item.subcategoria}</span>
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



      {/* LINK MODAL CATEGORIA */}
      <Modal onHide={handleCloseModalCat} show={modalCat}>
          
          <Modal.Header closeButton>
            <Modal.Title>Editar Categoria</Modal.Title>
          </Modal.Header>
        
          <Modal.Body>
            <form onSubmit={handleUpdateCategoria}>
              <div className="form-floating mb-3">
                <input type="text" id="inputFloatingCategory" name="categoria" className="form-control" defaultValue={catSelectModal.categoria} placeholder="Ingresa la categoría" />
                <label htmlFor="inputFloatingCategory">Nombre de la categoría</label>
              </div>
              <div className="d-flex gap-1">
                <button className="btn btn-primary">Actualizar categoría</button>
              </div>
            </form>
          </Modal.Body>

      </Modal>

      {/* LINK MODAL SUBCATEGORIA */}
      <Modal onHide={handleCloseModalSub} show={modalSub}>
          
          <Modal.Header closeButton>
            <Modal.Title>Editar Subcategoría</Modal.Title>
          </Modal.Header>
        
          <Modal.Body>
            <form onSubmit={handleUpdateSubcategoria}>
              <p className="mb-0 text-end text-muted fw-light">de la categoría {subSelectModal.categoria}</p>
              <div className="form-floating mb-3">
                <input type="text" id="inputFloatingCategory" name="subcategoria" className="form-control" defaultValue={subSelectModal.subcategoria} placeholder="Ingresa la subcategoría" />
                <label htmlFor="inputFloatingCategory">Nombre de la subcategoría</label>
              </div>
              <div className="d-flex gap-1">
                <button className="btn btn-primary">Actualizar subcategoría</button>
              </div>
            </form>
          </Modal.Body>

      </Modal>
    </>
  )
}

export default Categorias