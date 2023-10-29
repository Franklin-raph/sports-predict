import {useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({setShowSignIn}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const user = localStorage.getItem("user")
  const [userDropDown, setUserDropDown] = useState(false)

  function toggleUserDropdown(){
    setUserDropDown(!userDropDown)
  }

  function logoutUser(){
    localStorage.clear()
    location.reload()
  }

  return (
      <nav className='flex items-center justify-between w-full py-1 relative' style={{ borderBottom:"1px solid #4F3D3D" }}>
          <h3>Logo</h3>
          {!user && <button className='bg-[#4F3D3D]' onClick={() => setShowSignIn(true)}>Login</button>}
          {user && <i class="ri-user-3-line text-lg cursor-pointer" onClick={() => toggleUserDropdown()}></i>}
          {userDropDown && 
            <ul className='absolute bg-white shadow-2xl right-0 top-[40px] text-[14px] p-2 w-[50%]' style={{ border:"1px solid #D1D5DB" }}>
              {location.pathname === "/" ? 
                <li className='flex items-center justify-between bg-[#4F3D3D] text-white py-1 px-2' onClick={() => navigate("/")}>
                    <Link>Home</Link>
                    <i class="ri-home-5-line"></i>
                  </li>
                  :
                  <li className='flex items-center justify-between py-1' onClick={() => navigate("/")}>
                    <Link>Home</Link>
                    <i class="ri-home-5-line"></i>
                </li>
              }
              {location.pathname === "/settings" ? 
              <li className='flex items-center justify-between bg-[#4F3D3D] text-white py-1 px-2' onClick={() => navigate("/settings")}>
                <Link>Settings</Link>
                <i class="ri-settings-3-line"></i>
              </li>
              :
              <li className='flex items-center justify-between' onClick={() => navigate("/settings")}>
                <Link>Settings</Link>
                <i class="ri-settings-3-line"></i>
              </li>
              }

              {location.pathname === "/rankings" ? 
              <li className='flex items-center justify-between bg-[#4F3D3D] text-white py-1 px-2' onClick={() => navigate("/rankings")}>
                <Link>Rankings</Link>
                <i class="ri-line-chart-line"></i>
              </li>
              :
              <li className='flex items-center justify-between' onClick={() => navigate("/rankings")}>
                <Link>Rankings</Link>
                <i class="ri-line-chart-line"></i>
              </li>
              }

              {location.pathname === "/contact-us" ? 
              <li className='flex items-center justify-between bg-[#4F3D3D] text-white py-1 px-2' onClick={() => navigate("/contact-us")}>
                <Link>Contact Us</Link>
                <i class="ri-phone-line"></i>
              </li>
              :
              <li className='flex items-center justify-between' onClick={() => navigate("/contact-us")}>
                <Link>Contact Us</Link>
                <i class="ri-phone-line"></i>
              </li>
              }
              <li onClick={logoutUser} className='flex items-center justify-between mt-3 pt-2' style={{ borderTop:"1px solid gray" }}>
                <p>Logout</p>
                <i class="ri-logout-circle-r-line"></i>
              </li>
            </ul>
          }
        </nav>
  )
}

export default Navbar