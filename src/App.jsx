import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import SignIn from './pages/authentication/sign-in/SignIn'
import SignUp from './pages/authentication/sign-up/SignUp'
import PlaceBet from './pages/place-bet/PlaceBet'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/place-bet' element={<PlaceBet />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
