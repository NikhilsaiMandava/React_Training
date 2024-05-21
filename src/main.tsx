import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import Login from './Login/Login.tsx';
import Dashboard from './Dashboard/Dashboard.tsx';
import Map from '../src/Map/Map.tsx';
import Cargoes from './Cargoes/Cargoes.tsx';
import CargoesList from './Cargoes/CargoesList.tsx';
import Archive from './Cargoes/Archive.tsx';
import Voyages from './Voyages/Voyages.tsx';
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Navigate to='/login' />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='map' element={<Map />}/>
          <Route path='cargoes' element={<Cargoes />}>
            <Route path='list' element={<CargoesList />}/>
            <Route path='archive' element={<Archive />}/>
          </Route>
          <Route path='voyages' element={<Voyages />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)