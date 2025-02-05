import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './components/About'
import { Root } from './components/Root'
import { Home } from './components/Home'
import { Vans } from './components/Vans'
import './utils/server.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About />} />
          <Route path='/vans' element={<Vans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
