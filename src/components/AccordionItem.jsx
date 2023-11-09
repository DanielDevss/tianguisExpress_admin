import { BsChevronDown } from "react-icons/bs"
const AccordionItem = ({titulo,open,descripcion,children}) => {
    return (
        <details open={open} className="card border-dark-subtle shadow-sm mb-3">
            <summary className="card-header p-3">
                <span className="card-title h4 fw-normal">{titulo}</span> <br />
                <span className="fw-light text-muted">{descripcion}</span>
            </summary>
            
            <section className="card-body">
                <div className="row">
                    {children}
                </div>
            </section>
        </details>
    )
}

export default AccordionItem
