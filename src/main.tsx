import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

const LoginComponent=React.lazy(()=>import('./Login/Login.tsx'));
const DashboardComponent = React.lazy(() => import('./Dashboard/Dashboard.tsx'));
const MapComponent=React.lazy(()=> import('./Map/Map.tsx'));
const CargoesComponent=React.lazy(()=> import('./Cargoes/Cargoes.tsx'));
const CargoesListComponent=React.lazy(()=>import('./Cargoes/CargoesList.tsx'));
const ArchiveComponent = React.lazy(()=>import ('./Cargoes/ArchiveList/Archive.tsx'));
const VoyagesComponent = React.lazy(()=>import('./Voyages/Voyages.tsx'));
const UsersComponent=React.lazy(()=>import('./Users/Users.tsx'));
const AllUsersComponent=React.lazy(()=>import('./Users/AllUsers/AllUsers.tsx'));
const UsersOnlineComponent=React.lazy(()=>import('./Users/UsersOnline/UsersOnline.tsx'));
const ActivityReportComponent=React.lazy(()=>import('./Users/ActivityReport/ActivityReport.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/dashboard' element={<DashboardComponent />}>
            <Route path='map' element={<MapComponent />} />
            <Route path='cargoes' element={<CargoesComponent />}>
              <Route path='list' element={<CargoesListComponent />} />
              <Route path='archive' element={<ArchiveComponent />} />
            </Route>
            <Route path='voyages' element={<VoyagesComponent />} />
            <Route path='users' element={<UsersComponent />}>
              <Route path='allusers' element={<AllUsersComponent />} />
              <Route path='usersonline' element={<UsersOnlineComponent />} />
              <Route path='activityreport' element={<ActivityReportComponent />} />
            </Route>
          </Route>
        </Suspense>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)