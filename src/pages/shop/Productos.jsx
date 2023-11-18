import Header from "../../components/Header"
import { Tabs, Tab } from "react-bootstrap"
import IndiceNavegacion from "../../components/IndiceNavegacion"
import { nav_productos } from "../../utils/navegacionBreadcrumb"
import TableProductos from "../../components/tables/TableProductos"
import {StyleSheetManager} from "styled-components";
import { useForm } from "react-hook-form";
import useCategorias from "../../hooks/useCategorias"
const Productos = () => {

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
            <Header titulo="Productos">Administra los productos y categorías</Header>
            <IndiceNavegacion navegacion={nav_productos} />
            <Tabs className="mb-3">
                <Tab eventKey={"productos"} title={<span className="fw-bold link-dark">Productos</span>}>
                    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
                        <TableProductos sortActive={true} />
                    </StyleSheetManager>
                </Tab>
                <Tab eventKey={"categorias"} title={<span className="fw-bold link-dark">Categorías y subcategoría</span>}>
                    <section className="row">

                        
                        <div className="col-6">
                            <div className="card">
                                <header className="card-header">
                                    <h3 className="text-uppercase h5">Categorías</h3>
                                </header>
                                <div className="card-body">
                                    <form onSubmit={handleSubmitC(handleSubmitCat)}>
                                        <label className="form-label">Agrega una nueva categoría</label>
                                        <div className="input-group">
                                            <input placeholder="Ingresa una categoría" type="text" className="form-control" {...registerCat("categoria",{required:true}) } />
                                            <button className="btn btn-primary">Agregar</button>
                                        </div>
                                        {errrosCat.categoria?.type==="required" && <span className="d-block text-danger">Agrega el nombre de la categoría</span>}
                                    </form>
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
                                    <h3 className="text-uppercase h5">Subcategorías</h3>
                                </header>
                                <div className="card-body">
                                    {categoriaSelect.categoria ? (
                                        <>
                                            <form onSubmit={handleSubmitS(handleSubmitSub)}>
                                                <label className="form-label">Ingresa una subcategoria para: {categoriaSelect.categoria}</label>
                                                <div className="input-group">
                                                    <input placeholder="Ingresa la subcategoria" type="text" className="form-control" {...registerSub("subcategoria",{required:true}) } />
                                                    <button className="btn btn-primary">Agregar</button>
                                                </div>
                                                {errrosSub.subcategoria?.type==="required" && <span className="d-block text-danger">Agrega el nombre de la categoría</span>}
                                            </form>
                                            {subcategorias.length > 0 ? (
                                                <ul className="list-group list-group-flush mt-3">
                                                    {subcategorias && subcategorias.map(item => (
                                                        <li key={item.id} onClick={() => seleccionarCategoria(item)} className="list-group-item list-group-item-action">
                                                            {item.subcategoria}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : <span className="mt-3 d-block text-center text-muted">No se han añadido subcategorias en {categoriaSelect.categoria}</span>}
                                        </>
                                    ) : "Selecciona primero una categoría"}

                                </div>
                            </div>
                        </div>
                        
                    </section>
                </Tab>
            </Tabs>
        </>
    )
}

export default Productos