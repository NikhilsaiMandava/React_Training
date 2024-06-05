import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './Login/Login.tsx';
import Dashboard from './Dashboard/Dashboard.tsx';
import Map from '../src/Map/Map.tsx';
import Cargoes from './Cargoes/Cargoes.tsx';
import CargoesList from './Cargoes/CargoesList.tsx';
import Archive from './Cargoes/ArchiveList/Archive.tsx';
import Voyages from './Voyages/Voyages.tsx';
import Users from './Users/Users.tsx';
import AllUsers from '../src/Users/AllUsers/AllUsers.tsx';
import UsersOnline from '../src/Users/UsersOnline/UsersOnline.tsx';
import ActivityReport from './Users/ActivityReport/ActivityReport.tsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='map' element={<Map />} />
          <Route path='cargoes' element={<Cargoes />}>
            <Route path='list' element={<CargoesList />} />
            <Route path='archive' element={<Archive />} />
          </Route>
          <Route path='voyages' element={<Voyages />} />
          <Route path='users' element={<Users />}>
            <Route path='allusers' element={<AllUsers />} />
            <Route path='usersonline' element={<UsersOnline />} />
            <Route path='activityreport' element={<ActivityReport />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)