import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
