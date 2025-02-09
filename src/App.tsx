import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './components/About'
import { Root } from './components/Root'
import { Home } from './components/Home'
import { Vans } from './components/Vans/Vans.js'
import './utils/server.js'
import { VanDetail } from './components/Vans/VanDetail.js'
import { Dashboard } from './components/Host/Dashboard.js'
import { Income } from './components/Host/Income.js'
import { Reviews } from './components/Host/Reviews.js'
import { HostLayout } from './layouts/HostLayout.js'
import { HostVans } from './components/Host/HostVans/HostVans.js'
import { HostVanDetail } from './components/Host/HostVans/HostVanDetail.js'
import { HostVanPricing } from './components/Host/HostVans/HostVanPhotos.js'
import { HostVanPhotos } from './components/Host/HostVans/HostVanPricing.js'
import { HostVanInfo } from './components/Host/HostVans/HostVanInfo.js'
import { NotFound } from './components/NotFound.js'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='vans' element={<Vans />}>
          </Route>
          <Route path='vans/:id' element={<VanDetail />} />
          <Route path='host' element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='income' element={<Income />} />
            <Route path='vans' element={<HostVans />} />
            <Route path='vans/:id' element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />} />
              <Route path='pricing' element={<HostVanPricing />} />
              <Route path='photos' element={<HostVanPhotos />} />
            </Route>
            <Route path='reviews' element={<Reviews />} />
          </Route>

          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
