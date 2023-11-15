import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import useSesion from "../hooks/useSession"

const Layout = () => {

  const {systemOperative} = useSesion();

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
