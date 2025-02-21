import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { LoginPage, SignUpPage, Homepage } from './Routes'


function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/' element={<Homepage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App