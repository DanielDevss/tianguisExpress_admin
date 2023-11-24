import Header from '../components/Header';
import userMale from '../assets/icons/userMale.png';
import useAuth from "../hooks/useAuth";
const Account = () => {

  const { correo, nombre, rol } = useAuth();

  return (
    <>
      <Header titulo={"Ajuste de cuenta"}>Gestiona los accesos de tu cuenta</Header>
      <article className='card p-3 shadow-sm mb-3'>

        <header className='d-flex flex-column flex-md-row align-items-center w-100'>
          <img width='155' className='d-block m-auto mx-md-0 px-3' src={userMale} />
          <ul className='list-unstyled mb-0'>
            <li><span className='fw-bold'>Nombre:</span> {nombre}</li>
            <li><span className='fw-bold'>Correo:</span> {correo}</li>
            <li><span className='fw-bold'>Rol:</span> {rol}</li>
          </ul>
        </header>

      </article>

    </>
  )
}

export default Account
