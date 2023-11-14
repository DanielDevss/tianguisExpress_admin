import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const Layout = () => {

  return (
    <div className="d-flex h-100 bg-body" data-bs-theme="light">
      
      <Sidebar />

      <section className="contenido">
      
        <main className="p-3">

          <Outlet />
        
        </main>
      
      </section>
      
    </div>
  )
}
export default Layout
