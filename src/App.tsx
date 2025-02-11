import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import { About } from './components/About'
import { Root } from './components/Root'
import { Home } from './components/Home'
import { Vans, loader as vansLoader } from './components/Vans/Vans.js'
import './utils/server.js'
import { VanDetail, loader as vanDetailLoader } from './components/Vans/VanDetail.js'
import { Dashboard } from './components/Host/Dashboard.js'
import { Income } from './components/Host/Income.js'
import { Reviews } from './components/Host/Reviews.js'
import { HostLayout } from './layouts/HostLayout.js'
import { HostVans, loader as hostVansLoader } from './components/Host/HostVans/HostVans.js'
import { HostVanDetail, loader as hostVanDetailLoader } from './components/Host/HostVans/HostVanDetail.js'
import { HostVanPricing } from './components/Host/HostVans/HostVanPhotos.js'
import { HostVanPhotos } from './components/Host/HostVans/HostVanPricing.js'
import { HostVanInfo } from './components/Host/HostVans/HostVanInfo.js'
import { NotFound } from './components/NotFound.js'
import { Error } from './components/Error.js'
import {Login, loginLoader} from './components/Auth/Login.js'
import { requireAuth } from './utils/auth.ts'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={lo}
      />
      <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />}>
      </Route>
      <Route path='vans/:id' element={<VanDetail />} loader={vanDetailLoader}/>
      <Route path='host' element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async () =>  await requireAuth()}
        />

        <Route
          path='income'
          element={<Income />}
          loader={async () =>  await requireAuth()}
        />

        <Route
          path='vans'
          element={<HostVans />}
          loader={hostVansLoader}
        />

        <Route
          path='vans/:id'
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >

          <Route
            index
            element={<HostVanInfo />}
            loader={async () => await requireAuth()}
          />

          <Route
            path='pricing'
            element={<HostVanPricing />}
            loader={async () => await requireAuth()}
          />

          <Route
            path='photos'
            element={<HostVanPhotos />}
            loader={async () =>  await requireAuth()}
          />

        </Route>
        <Route path='reviews' element={<Reviews />} loader={async() => await requireAuth()}/>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
