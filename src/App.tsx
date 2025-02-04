import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './components/About'
import { Root } from './components/Root'
import { Home } from './components/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
