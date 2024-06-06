import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

const LoginComponent = React.lazy(() => import('./Login/Login.tsx'));
const DashboardComponent = React.lazy(() => import('./Dashboard/Dashboard.tsx'));
const MapComponent = React.lazy(() => import('./Map/Map.tsx'));
const CargoesComponent = React.lazy(() => import('./Cargoes/Cargoes.tsx'));
const CargoesListComponent = React.lazy(() => import('./Cargoes/CargoesList.tsx'));
const ArchiveComponent = React.lazy(() => import('./Cargoes/ArchiveList/Archive.tsx'));
const VoyagesComponent = React.lazy(() => import('./Voyages/Voyages.tsx'));
const UsersComponent = React.lazy(() => import('./Users/Users.tsx'));
const AllUsersComponent = React.lazy(() => import('./Users/AllUsers/AllUsers.tsx'));
const UsersOnlineComponent = React.lazy(() => import('./Users/UsersOnline/UsersOnline.tsx'));
const ActivityReportComponent = React.lazy(() => import('./Users/ActivityReport/ActivityReport.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginComponent />
          </Suspense>} 
        />
        <Route path='/dashboard' element={
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardComponent />
          </Suspense>}
        >
          <Route path='map' element={
            <Suspense fallback={<div>Loading...</div>}>
              <MapComponent />
              </Suspense>} 
            />
          <Route path='cargoes' element={
            <Suspense fallback={<div>Loading...</div>}>
            <CargoesComponent />
            </Suspense>}
          >
            <Route path='list' element={
              <Suspense fallback={<div>Loading...</div>}>
                <CargoesListComponent />
              </Suspense>} 
            />
            <Route path='archive' element={
              <Suspense fallback={<div>Loading...</div>}>
                <ArchiveComponent />
              </Suspense>} 
            />
          </Route>
          <Route path='voyages' element={
            <Suspense fallback={<div>Loading...</div>}>
              <VoyagesComponent />
            </Suspense>} 
          />
          <Route path='users' element={
            <Suspense fallback={<div>Loading...</div>}>
              <UsersComponent />
            </Suspense>}
          >
            <Route path='allusers' element={
              <Suspense fallback={<div>Loading...</div>}>
                <AllUsersComponent />
              </Suspense>} 
            />
            <Route path='usersonline' element={
              <Suspense fallback={<div>Loading...</div>}>
                <UsersOnlineComponent />
              </Suspense>} 
            />
            <Route path='activityreport' element={
              <Suspense fallback={<div>Loading...</div>}>
                <ActivityReportComponent />
              </Suspense>} 
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)