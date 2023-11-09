import React from 'react'

const Header = ({titulo, children}) => {
  return (
    <header>
        <h1 className='fw-bold text-uppercase h2'>{titulo}</h1>
        <p className='h5 fw-light'>{children}</p>
        <hr />
    </header>
  )
}

export default Header
