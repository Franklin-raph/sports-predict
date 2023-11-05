import {useState} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SignIn from '../../components/sign-in/SignIn'
import SignUp from '../../components/sign-up/SignUp'
import PlaceBet from '../../components/place-bet/PlaceBet'
import Navbar from '../../components/navbar/Navbar'

const Home = ({baseUrl}) => {

  const user = localStorage.getItem("user")
  const navigate = useNavigate()
  const location = useLocation()
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showPlaceBet, setShowPlaceBet] = useState(false)

  function toggleUserDropdown(){
    setUserDropDown(!userDropDown)
  }

  function logoutUser(){
    localStorage.clear()
    location.reload()
  }

  return (
    <div>
      <div className="all-games flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[37%]">
        <Navbar setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp}/>
        <div className='w-full'>
          <div className="flex items-center justify-between my-5">
            <h2 className='text-lg font-bold text-[#4F3D3D]'>All Games</h2>
          </div>
          <div className='flex items-center justify-between mt-3'>
            <div className='flex items-center gap-3'>
              <button className='bg-[#4F3D3D]'>Played</button>
              <button className='bg-[#797979]'>Unplayed</button>
              <button className='bg-[#797979]'>New</button>
            </div>
            <button className='bg-[#4F3D3D]' onClick={() => setShowPlaceBet(true)}>+</button>
          </div>
          <div className='my-5'>
            <div className="bg-gray-300 py-4 rounded my-2"></div>
            <div className="bg-gray-300 py-4 rounded my-2"></div>
            <div className="bg-gray-300 py-4 rounded my-2"></div>
            <div className="bg-gray-300 py-4 rounded my-2"></div>
            <div className="bg-gray-300 py-4 rounded my-2"></div>
            <div className="bg-gray-300 py-4 rounded my-2"></div>
          </div>
        </div>
      </div>
      {showSignIn && <SignIn setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} baseUrl={baseUrl}/>}
      {showSignUp && <SignUp setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} baseUrl={baseUrl}/>}
      {showPlaceBet && <PlaceBet setShowPlaceBet={setShowPlaceBet}/> }
      
    </div>
  )
}

export default Home