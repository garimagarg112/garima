
import Login from './assets/Dashlogin.jsx'
import Loginback from './assets/DashLoginBack.jsx'
import Dashboard from './assets/Dashboard.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function App() {

  return (
    <>
              <BrowserRouter>
               
               <Routes>
                 <Route path="/" element={<Login  />} />
                 <Route path="/login" element={<Loginback  />} />
                 {/* <Route path="/counter" element={<Counter  />} />
                 <Route path="/counter" element={<Todo  />} />
                 <Route path="/showuser/:id" element={<ShowUser  />} /> */}
                 <Route path="/dashboard" element={<Dashboard  />} />

                 {/* <Route path="/taskmanage" element={< TaskManagement />} /> */}
               </Routes> 
              
         </BrowserRouter>
    </>
  )
}

export default App
