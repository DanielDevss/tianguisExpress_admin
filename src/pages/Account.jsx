import Header from '../components/Header'
import userMale from '../assets/icons/userMale.png'

const Account = () => {
  return (
    <>
      <Header titulo={"Ajuste de cuenta"}>Gestiona los accesos de tu cuenta</Header>
      
      <article className='card p-3 shadow-sm mb-3'>

        <header className='d-flex flex-column flex-md-row align-items-center w-100'>
          <img width='155' className='d-block m-auto mx-md-0 px-3' src={userMale} />
          <form className='w-100'>
            <input type="text" className='form-control w-100 mb-3' placeholder='Ingresa tu nombre' name='value' />
            <button className='btn btn-primary'>Aplicar</button>
          </form>
        </header>

      </article>

    </>
  )
}

export default Account
