import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import LoaderComponent from './Common/Loader/Loader.tsx';

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
          <Suspense fallback={<LoaderComponent />}>
            <LoginComponent />
          </Suspense>}
        />
        <Route path='/dashboard' element={
          <Suspense fallback={<LoaderComponent />}>
            <DashboardComponent />
          </Suspense>}
        >
          <Route path='map' element={
            <Suspense fallback={<LoaderComponent />}>
              <MapComponent />
              </Suspense>}
            />
          <Route path='cargoes' element={
            <Suspense fallback={<LoaderComponent />}>
            <CargoesComponent />
            </Suspense>}
          >
            <Route path='list' element={
              <Suspense fallback={<LoaderComponent />}>
                <CargoesListComponent />
              </Suspense>}
            />
            <Route path='archive' element={
              <Suspense fallback={<LoaderComponent />}>
                <ArchiveComponent />
              </Suspense>}
            />
          </Route>
          <Route path='voyages' element={
            <Suspense fallback={<LoaderComponent />}>
              <VoyagesComponent />
            </Suspense>}
          />
          <Route path='users' element={
            <Suspense fallback={<LoaderComponent />}>
              <UsersComponent />
            </Suspense>}
          >
            <Route path='allusers' element={
              <Suspense fallback={<LoaderComponent />}>
                <AllUsersComponent />
              </Suspense>}
            />
            <Route path='usersonline' element={
              <Suspense fallback={<LoaderComponent />}>
                <UsersOnlineComponent />
              </Suspense>}
            />
            <Route path='activityreport' element={
              <Suspense fallback={<LoaderComponent />}>
                <ActivityReportComponent />
              </Suspense>}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)