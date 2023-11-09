
const LoaderContent = () => {
    return (
        <div>
            <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <span className="ms-2">Cargando contenido...</span>
            </div>
        </div>
    )
}

export default LoaderContent
