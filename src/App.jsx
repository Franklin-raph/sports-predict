import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Settings from './pages/settings/Settings'
import Rankings from './pages/rankings/Rankings'
import Navbar from './components/navbar/Navbar'
import ContactUs from './pages/contact-us/ContactUs'

function App() {

  const baseUrl = "https://sbc-tu3x.onrender.com/api/sbc"

  function scrollToTop(){
    window.scrollTo(0, 0)
  }

  function checkScrollHeight(){
    // console.log(window.document.)
  }

  return (
    <HashRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home baseUrl={baseUrl}/>}/>
        <Route path='/settings' element={<Settings baseUrl={baseUrl}/>}/>
        <Route path='/rankings' element={<Rankings baseUrl={baseUrl}/>}/>
        <Route path='/contact-us' element={<ContactUs baseUrl={baseUrl}/>}/>
      </Routes>
      <button className='fixed bottom-5 right-5 bg-[#4F3D3D] px-2 py-1 text-xl text-white rounded-md' onClick={() => scrollToTop()}><i class="ri-arrow-up-double-fill"></i></button>
    </HashRouter>
  )
}

export default App
