import {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({setShowSignIn, setShowSignUp, baseUrl}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem("user"))
  const [userDropDown, setUserDropDown] = useState(false)
  const [userBalance, setUserBalance] = useState()

  function toggleUserDropdown(){
    setUserDropDown(!userDropDown)
  }

  function logoutUser(){
    localStorage.clear()
    // window.location.reload()
    window.location.href = "/"
  }

  useEffect(() => {
    getUserBalance()
  },[])

  async function getUserBalance(){
    const response = await fetch(`${baseUrl}/user/check-balance`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    })
    const data = await response.json()
    setUserBalance(data.message)
    console.log(response, data)
  }

  return (
      <nav className='flex items-center justify-between w-full py-1 relative' style={{ borderBottom:"1px solid #4F3D3D" }}>
        {!user && 
          <div className='bg-[#4f3d3d] text-white w-full text-center rounded-[10px] mb-5 px-3'>
            <h4 className='mb-[1rem] mt-[3rem] font-bold text-xl text-[#847777]'>You do not have an account logged in</h4>
            <div className='mt-[1rem] mb-[3rem] flex items-center justify-center gap-[20px]'>
              <button className='bg-[#d9d9d9]' style={{ padding:"10px 20px", color:"#874444" }} onClick={() => setShowSignUp(true)}>Sign Up</button>
              <button className='bg-[#847777]' style={{ padding:"10px 20px" }} onClick={() => setShowSignIn(true)}>Sign In</button>
            </div>
          </div>
        }
        {user && 
          <div className='bg-[#4f3d3d] text-white w-full text-center rounded-[10px] mb-5 p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <i class="ri-user-3-line text-lg cursor-pointer" onClick={() => toggleUserDropdown()}></i>
                <p>{user.message.userDetails.username}</p>
                {/* <p>{user.message.userDetails.username}</p> */}
              </div>
              <i class="ri-menu-line text-lg cursor-pointer" onClick={() => toggleUserDropdown()}></i>
            </div>
            <div className='mt-[3rem] flex items-end justify-end gap-[20px]'>
              <p>${userBalance && userBalance.message}</p>
            </div>
          </div>
        }
        
          {/* <h3 onClick={() => navigate("/")}>Logo</h3>
          {!user && <button className='bg-[#4F3D3D]' onClick={() => setShowSignIn(true)}>Login</button>} */}
          {/* {user && <i class="ri-user-3-line text-lg cursor-pointer" onClick={() => toggleUserDropdown()}></i>} */}

          {userDropDown && 
            <ul className='absolute bg-white shadow-2xl right-0 top-[45px] text-[14px] p-2 w-[50%]' style={{ border:"1px solid #D1D5DB" }}>
              {location.pathname === "/" ? 
                <li className='flex items-center justify-between bg-[#4F3D3D] text-white py-1 px-2 cursor-pointer' onClick={() => navigate("/")}>
                    <Link>Home</Link>
                    <i class="ri-home-5-line"></i>
                  </li>
                  :
                  <li className='flex items-center justify-between py-1 cursor-pointer' onClick={() => navigate("/")}>
                    <Link>Home</Link>
                    <i class="ri-home-5-line"></i>
                </li>
              }
              {location.pathname === "/settings" ? 
              <li className='flex items-center justify-between bg-[#4F3D3D] text-white py-1 px-2 cursor-pointer' onClick={() => navigate("/settings")}>
                <Link>Settings</Link>
                <i class="ri-settings-3-line"></i>
              </li>
              :
              <li className='flex items-center justify-between cursor-pointer' onClick={() => navigate("/settings")}>
                <Link>Settings</Link>
                <i class="ri-settings-3-line"></i>
              </li>
              }

              {location.pathname === "/rankings" ? 
              <li className='flex items-center justify-between bg-[#4F3D3D] text-white py-1 px-2 cursor-pointer' onClick={() => navigate("/rankings")}>
                <Link>Rankings</Link>
                <i class="ri-line-chart-line"></i>
              </li>
              :
              <li className='flex items-center justify-between cursor-pointer' onClick={() => navigate("/rankings")}>
                <Link>Rankings</Link>
                <i class="ri-line-chart-line"></i>
              </li>
              }

              {location.pathname === "/contact-us" ? 
              <li className='flex items-center justify-between bg-[#4F3D3D] text-white py-1 px-2 cursor-pointer' onClick={() => navigate("/contact-us")}>
                <Link>Contact Us</Link>
                <i class="ri-phone-line"></i>
              </li>
              :
              <li className='flex items-center justify-between cursor-pointer' onClick={() => navigate("/contact-us")}>
                <Link>Contact Us</Link>
                <i class="ri-phone-line"></i>
              </li>
              }
              <li onClick={logoutUser} className='flex items-center justify-between mt-3 pt-2 cursor-pointer' style={{ borderTop:"1px solid gray" }}>
                <p>Logout</p>
                <i class="ri-logout-circle-r-line"></i>
              </li>
            </ul>
          }
        </nav>
  )
}

export default Navbar