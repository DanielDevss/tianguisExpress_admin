import Swal from "sweetalert2";
import Header from "../../components/Header";
import IndiceNavegacion from "../../components/IndiceNavegacion";
import useProductos from "../../hooks/useProductos";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { nav_nuevoProducto } from "../../utils/navegacionBreadcrumb";
import { expRegs } from "../../utils/utils";
import useCategorias from "../../hooks/useCategorias";

const AddProduct = () => {
    
    const {register, handleSubmit, formState: {errors}, watch} = useForm();

    const {crearProducto} = useProductos();

    const { seleccionarCategoria, subcategorias, categorias } = useCategorias();

    const handleSubmitForm = (data) => {

        const file = data.cover[0];
        const fileName = file.name;
        const fileExt = fileName.split(".")[fileName.split(".").length - 1].toLowerCase();
        const fileSize = file.size / 1000000;

        console.log(fileExt);
        
        if(fileSize > 1){
            Swal.fire("Imagen no admitida", "La imagen es demasiado pesada, solo se admiten imagenes menores a 1MB", "warning");
            return;
        }
        
        if(fileExt !== "jpg" && fileExt !== "png" && fileExt !== "jpeg"){
            Swal.fire("Imagen no admitida", "El formato de la imagen no es admitido, solo se admiten jpeg, jpg y png", "warning");
            return;
        }
        
        crearProducto({body: data});
    }

    useEffect(() => {
        const seleccionarCategoriaPorCampo = () => {
            const categoria = watch('categoria');
    
            if (categoria) {
                const categoriaSeleccionada = categorias.find(cat => cat.categoria === categoria);
    
                if (categoriaSeleccionada) {
                    seleccionarCategoria(categoriaSeleccionada);
                }
            }
        };
    
        seleccionarCategoriaPorCampo();
    }, [watch, categorias, seleccionarCategoria]);
    

  return (
    <>
        <Header titulo={"Agrega un nuevo producto"}>Asegurate de rellenar los campos importantes</Header>
        
        <IndiceNavegacion navegacion={nav_nuevoProducto} />
        
        <section>
            
            <form className="row" onSubmit={handleSubmit(handleSubmitForm)} noValidate >
                {/* NOTE SKU */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">SKU del producto *</label>
                        <input type="text" className="form-control" placeholder="Ingresa un SKU" {...register("sku", {required: true, pattern: expRegs.codigos})} />
                        <span className="text-danger">{errors.sku?.type === "required" && "El SKU es obligatorio"}</span>
                        <span className="text-danger">{errors.sku?.type === "pattern" && "Ingresaste simbolos invalidos, solo se acepta guion medio y puntos"}</span>
                    </div>
                </div>

                {/* NOTE CODIGO */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Código universal *</label>
                        <input type="text" className="form-control" placeholder="Ingresa el código universal" {...register("codigo", {required:true, pattern:expRegs.codigos})} />
                        <span className="text-danger">{errors.codigo?.type === "required" && "El código universal es obligatorio"}</span>
                        <span className="text-danger">{errors.codigo?.type === "pattern" && "Ingresaste simbolos invalidos, solo se acepta guion medio y puntos"}</span>
                    </div>
                </div>

                {/* NOTE CATEGORIA */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Categoría del producto *</label>
                        <select className="form-select" {...register("categoria", {required:true})}>
                            <option value={""}>Selecciona una opción</option>
                            {categorias && categorias.map(cat => (
                                <option key={cat.id} value={cat.categoria}>{cat.categoria}</option>
                            ))}
                        </select>
                        <span className="text-danger">{errors.categoria?.type==="required" && "Selecciona una categoría"}</span>
                    </div>
                </div>
                
                {/* NOTE SUBCATEGORIA */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Subcategoria del producto *</label>
                        <select className="form-select" {...register("subcategoria", {required:true})}>
                            <option value={""}>Selecciona una opción</option>
                            {subcategorias && subcategorias.map(sub => (
                                <option value={sub.subcategoria} key={sub.id}>{sub.subcategoria}</option>
                            ))}
                        </select>
                        <span className="text-danger">{errors.subcategoria?.type==="required" && "Selecciona una subcategoría"}</span>
                    </div>
                </div>

                {/* NOTE TITULO O CARACTERISTICAS */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Titulo *</label>
                        <input type="text" className="form-control" placeholder="Ej. : Lenovo Ideapad s145 16GB de RAM y 520GB de SSD" {...register("titulo", {required:true, pattern: expRegs.parrafos})} />
                        <span className="text-danger">{errors.titulo?.type==="required" && "El titulo es obligatorio"}</span>
                        <span className="text-danger">{errors.titulo?.type==="pattern" && "No puedes ingresar caracteres extraños en este campo"}</span>
                    </div>
                </div>

                {/* NOTE TNOMBRE O VARIANTE */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Ingresa un nombre *</label>
                        <input type="text" className="form-control" placeholder="Este servira como variante o modelo principal" {...register("nombre", {required: true, pattern: expRegs.parrafos})} />
                        <span className="text-danger">{errors.nombre?.type==="required" && "El nombre o variante es obligatorio"}</span>
                        <span className="text-danger">{errors.nombre?.type==="pattern" && "No puedes ingresar caracteres extraños en este campo"}</span>
                    </div>
                </div>
                
                {/* NOTE DETALLES DEL PRODUCTO */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Detalles del producto *</label>
                        <textarea className="form-control" placeholder="Ingresa una descripcion o detalles del producto" {...register("detalles", {required:true})}></textarea>
                        <span className="text-danger">{errors.detalles?.type==="required" && "El campo detalles es obligatorio"}</span>
                        {/* <span className="text-danger">{errors.detalles?.type==="pattern" && "No puedes ingresar caracteres extraños en este campo"}</span> */}
                    </div>
                </div>
                
                {/* NOTE MAS INFORMACION */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Mas información (agrega información extra)</label>
                        <textarea className="form-control" placeholder="Ingresa información extra acerca de este producto, como información de garantía o devoluciones" {...register("mas_informacion", {pattern:expRegs.parrafos})} ></textarea>
                        <span className="text-danger">{errors.mas_informacion?.type==="pattern" && "No puedes ingresar caracteres extraños en este campo"}</span>
                    </div>
                </div>

                {/* NOTE MEDIDAS DEL PRODUCTO */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Ingresa el alto, ancho y largo del producto en ese orden *</label>
                        <div className="input-group">
                            <input placeholder="Largo (cm)" type="number" className="form-control" {...register("alto", {required: true})} />
                            <input placeholder="Ancho (cm)" type="number" className="form-control" {...register("ancho", {required: true})} />
                            <input placeholder="Alto (cm)" type="number" className="form-control" {...register("largo", {required: true})} />
                        </div>
                        <span className="text-danger">{(errors.alto?.type==="required" || errors.ancho?.type==="required" || errors.largo?.type==="required") && "Todos las medidas del producto son obligatorias"}</span>
                    </div>
                </div>

                {/* NOTE MEDIDAS DEL EMPAQUE */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Ingresa el alto, ancho y largo del empaque en ese orden *</label>
                        <div className="input-group">
                            <input placeholder="Largo (cm)" type="number" className="form-control" {...register("emp_alto", {required: true})} />
                            <input placeholder="Ancho (cm)" type="number" className="form-control" {...register("emp_ancho", {required: true})} />
                            <input placeholder="Alto (cm)" type="number" className="form-control" {...register("emp_largo", {required: true})} />
                        </div>
                        <span className="text-danger">{(errors.emp_alto?.type==="required" || errors.emp_ancho?.type==="required" || errors.emp_largo?.type==="required") && "Todos las medidas del empaque son obligatorias"}</span>
                    </div>
                </div>

                {/* NOTE PRECIO POR UNIDAD */}
                <div className="col-md-3">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Precio de producto *</label>
                        <input type="number" className="form-control" placeholder="Precio por unidad" {...register("precio", {required:true})} />
                        <span className="text-danger">{errors.precio?.type==="required" && "El precio del producto es obligatorio."}</span>
                    </div>
                </div>
                
                {/* NOTE PESO POR UNIDAD */}
                <div className="col-md-3">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Peso (KG)</label>
                        <input type="number" className="form-control" placeholder="Peso del producto en kg" {...register("peso")} />
                    </div>
                </div>

                {/* NOTE IMAGEN DEL PRODUCTOS */}
                <div className="col-md-6">
                    <div className="mb-4">
                        <label className="fw-bold form-label">Imagen del cover (Menor a 1MB) *</label>
                        <input type="file" accept=".png, .jpg, .jpeg" className="form-control" {...register("cover", {required: true})} />
                        <span className="text-danger">{errors.cover?.type==="required" && "Selecciona una imagen por favor"}</span>
                    </div>
                </div>

                <div className="border-top pt-3">
                    <span className="d-block mb-3 text-muted">Recuerda que siempre puedes editar la información</span>
                    <button className="btn btn-outline-primary me-2">Cancelar</button>
                    <button className="btn btn-primary">Guardar este producto</button>
                </div>
            </form>
        </section>
    </>
  )

  
}

export default AddProduct