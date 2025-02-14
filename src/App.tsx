import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { About } from './components/About'
import { Root } from './components/Root'
import { Home } from './components/Home'
import { Vans, loader as vansLoader } from './components/Vans/Vans.js'
//import './utils/server.js'
import { VanDetail, loader as vanDetailLoader } from './components/Vans/VanDetail.js'
import { HostLayout } from './layouts/HostLayout.js'
import { HostVans, loader as hostVansLoader } from './components/Host/HostVans/HostVans.js'
import { HostVanDetail, loader as hostVanDetailLoader } from './components/Host/HostVans/HostVanDetail.js'
import { HostVanPricing } from './components/Host/HostVans/HostVanPhotos.js'
import { HostVanPhotos } from './components/Host/HostVans/HostVanPricing.js'
import { HostVanInfo } from './components/Host/HostVans/HostVanInfo.js'
import { NotFound } from './components/NotFound.js'
import { Error } from './components/Error.js'
import {action as loginAction, Login, loginLoader} from './components/Auth/Login.js'
import { requireAuth } from './utils/auth.ts'
import Reviews from './components/Host/Reviews.tsx'
import Income from './components/Host/Income.tsx'
import Dashboard, {loader as dashboardLoader} from './components/Host/Dashboard.tsx'

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action = {loginAction}
      />
      <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />}>
      </Route>
      <Route path='vans/:id' element={<VanDetail />} loader={vanDetailLoader} errorElement={<Error />}/>
      <Route path='host' element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={dashboardLoader}
        />

        <Route
          path='income'
          element={<Income />}
          loader={async ({request}) =>  await requireAuth(request)}
        />

        <Route
          path='vans'
          element={<HostVans />}
          errorElement={<Error />}
          loader={hostVansLoader}
        />

        <Route
          path='vans/:id'
          element={<HostVanDetail />}
          errorElement={<Error />}
          loader={hostVanDetailLoader}
        >

          <Route
            index
            element={<HostVanInfo />}
            loader={async ({request}) => await requireAuth(request)}
          />

          <Route
            path='pricing'
            element={<HostVanPricing />}
            loader={async ({request}) => await requireAuth(request)}
          />

          <Route
            path='photos'
            element={<HostVanPhotos />}
            loader={async ({request}) =>  await requireAuth(request)}
          />

        </Route>
        <Route path='reviews' element={<Reviews />} loader={async({request}) => await requireAuth(request)}/>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
