import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Layout = () => {

  const { token } = useContext(AuthContext);

  if(!token) {
    return <Navigate to={"/login"}/>
  }

  return (
    <div className="d-flex h-100 bg-body" data-bs-theme="light">
      
      <Sidebar />

      <section className="contenido">
      
        <main className="p-3 bg-bg-body-tertiary" style={{minHeight: "100vh"}}>

          <Outlet />
        
        </main>
      
      </section>
      
    </div>
  )
}
export default Layout
