import Header from '../components/Header'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import useAuth from "../hooks/useAuth.js"


const Usuarios = () => {

  const { crearLink, link } = useAuth();

    const [modalLink, setModalLink] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const closeModalLink = () => setModalLink(false);
    const showModalLink = () => {
      setModalLink(true);
      crearLink();
    };

    
  const handleCopiar = () => {
    navigator.clipboard.writeText(link).then(() => {
      setMessageModal(true);
      setTimeout(() => setMessageModal(false), 1500);
    });
  }


    return (
    <div>
        <Header titulo={"Gestión de usuarios"}>Crea enlaces de registro, aumenta los roles, elimina los usuarios</Header>
        <article className='card shadow-sm'>
        <section className='card-body'>
          <p className=''>Crea un link de registro y compartelo con la persona que se integrara a la administraciòn de Tianguis Express.</p>
          <button onClick={showModalLink} className='btn btn-primary fw-bold'>Crear link de registro</button>
        </section>
      </article>

      <Modal size='lg' show={modalLink} onHide={closeModalLink}>
        <Modal.Header closeButton>
          <Modal.Title>Link de Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='input-group mb-3'>
            <input defaultValue={link && link} type="url" className='form-control bg-white' disabled />
            <button onClick={handleCopiar} title='click para copiar' className={`input-group-text fw-bold ${messageModal && "text-success bg-success-subtle"}`}>
              {messageModal ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
            <p className='text-body-secondary mt-2 mb-0'>Este URL compartelo con el nuevo integrante de la administración de Tianguis Express. Es de un solo uso para proteger la información del panel, si no logra concretar el registro correctamente debes proporcionar otro enlace.</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Usuarios
