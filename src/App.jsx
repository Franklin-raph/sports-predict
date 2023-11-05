import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Rankings from './pages/rankings/Rankings'
import Navbar from './components/navbar/Navbar'
import ContactUs from './pages/contact-us/ContactUs'

function App() {

  const baseUrl = "https://sbc-tu3x.onrender.com/"

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home baseUrl={baseUrl}/>}/>
        <Route path='/settings' element={<Settings />}/>
        <Route path='/rankings' element={<Rankings />}/>
        <Route path='/contact-us' element={<ContactUs />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
