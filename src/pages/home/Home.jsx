import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignIn from '../../components/sign-in/SignIn'
import SignUp from '../../components/sign-up/SignUp'
import PlaceBet from '../../components/place-bet/PlaceBet'

const Home = () => {

  const user = localStorage.getItem("user")
  const navigate = useNavigate()
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showPlaceBet, setShowPlaceBet] = useState(false)
  const [userDropDown, setUserDropDown] = useState(false)

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
        <nav className='flex items-center justify-between w-full py-1 relative' style={{ borderBottom:"1px solid #4F3D3D" }}>
          <h3>Logo</h3>
          {!user && <button className='bg-[#4F3D3D]' onClick={() => setShowSignIn(true)}>Login</button>}
          {user && <i class="ri-user-3-line text-lg cursor-pointer" onClick={() => toggleUserDropdown()}></i>}
          {userDropDown && 
            <ul className='absolute bg-white shadow-2xl right-0 top-[40px] text-[14px] p-2' style={{ border:"1px solid #D1D5DB" }}>
              <li>
                <Link>Home</Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link>Rankings</Link>
              </li>
              <li>
                <Link>Contact Us</Link>
              </li>
              <li onClick={logoutUser}>Logout</li>
            </ul>
          }
        </nav>
        <div className='w-full'>
          <div className="flex items-center justify-between my-5">
            <h2 className='text-lg font-bold text-[#4F3D3D]'>All Games</h2>
            <p>#50,000</p>
          </div>
          <div className='flex items-center justify-between'>
            <div className='mt-3 flex items-center gap-3'>
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
      {showSignIn && <SignIn setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp}/>}
      {showSignUp && <SignUp setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn}/>}
      {showPlaceBet && <PlaceBet setShowPlaceBet={setShowPlaceBet}/> }
      
    </div>
  )
}

export default Home