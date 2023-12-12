import {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../../assets/logo png (1).png"
import { jwtDecode } from "jwt-decode";
import { NAV_LINKS } from '../../constants/Navlinks';

const Navbar = ({setShowSignIn, setShowSignUp, baseUrl}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem("user"))
  const [userDropDown, setUserDropDown] = useState(false)
  const [userBalance, setUserBalance] = useState()
  const [loading, setLoading] = useState(false)

  function toggleUserDropdown(){
    setUserDropDown(!userDropDown)
  }

  function logoutUser(){
    localStorage.clear()
    // window.location.reload()
    window.location.href = "/"
  }

  useEffect(() => {
    // if(user){
      getUserBalance()
    // }
  },[])

  useEffect(() => {
    if(!user) return
    let decodedToken = jwtDecode(user.token);
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      localStorage.clear()
      // window.location.reload()
      // window.location.href = "/"
      navigate("/")
    } else {
      console.log("Valid token");
      // return true;
    }
},[])

  async function getUserBalance(){
    setLoading(true)
    const response = await fetch(`${baseUrl}/user/check-balance`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    })
    const data = await response.json()
    setLoading(false)
    setUserBalance(data.message)
    console.log(response, data)
  }
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiJzYmMtMDMtN2NjM2UzIiwiYWN0aXZlIjp0cnVlLCJzdGF0dXMiOiJhY3RpdmF0ZWQifSwiaWF0IjoxNzAxNzIzNDQ4LCJleHAiOjE3MDE5ODI2NDh9.CdjrrtWZVoi5jLJNOlrKSQ8qePs1XlOenRO2a0--QNc"
  return (
      <nav className='flex items-center justify-between w-full pb-1 relative flex-col' style={{ borderBottom:"1px solid #4F3D3D" }}>
        <img src={Logo} alt="" width="30%" className='mb-2'/>
        {!user && 
          <div className='bg-[#4f3d3d] text-white w-full text-center rounded-[10px] mb-5 px-3 h-[196px]'>
            <h4 className='mb-[1rem] mt-[3rem] font-bold text-xl text-[#847777]'>You do not have an account logged in</h4>
            <div className='mt-[1rem] mb-[3rem] flex items-center justify-center gap-[20px]'>
              <button className='bg-[#d9d9d9]' style={{ padding:"10px 20px", color:"#874444" }} onClick={() => setShowSignUp(true)}>Sign Up</button>
              <button className='bg-[#847777]' style={{ padding:"10px 20px" }} onClick={() => setShowSignIn(true)}>Sign In</button>
            </div>
          </div>
        }
        {user && 
          <div className='bg-[#4f3d3d] text-white w-full text-center rounded-[10px] mb-5 p-4 h-[196px] flex flex-col justify-between'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 font-bold'>
                <i class="ri-user-3-line text-lg cursor-pointer" onClick={() => toggleUserDropdown()}></i>
                <p className='uppercase'>{user.message.userDetails.username}</p>
                {/* <p>{user.message.userDetails.username}</p> */}
              </div>
              <i class="ri-menu-line text-lg cursor-pointer" onClick={() => toggleUserDropdown()}></i>
            </div>
            <div className='mt-[3rem] flex items-end justify-end gap-[20px] relative bottom-0'>
              {loading ? 
              <i class="fa-solid fa-spinner fa-spin"></i>
              :
              <p>${userBalance && userBalance}</p>
              }
            </div>
          </div>
        }
        
          {userDropDown && 
            <ul className='absolute bg-white shadow-2xl right-0 top-[145px] text-[14px] p-2 w-[50%]' style={{ border:"1px solid #D1D5DB" }}>
              {NAV_LINKS.map((link) => (
                <>
                  {location.pathname === link.navigate
                  ?
                  <li className={`flex items-center bg-[#4F3D3D] text-white justify-between py-1 px-2 cursor-pointer`} onClick={() => navigate(link.navigate)}>
                    <Link>{link.label}</Link>
                    <i class={link.icon}></i>
                  </li>
                :
                  <li className={`flex items-center justify-between py-1 px-2 cursor-pointer`} onClick={() => navigate(link.navigate)}>
                    <Link>{link.label}</Link>
                    <i class={link.icon}></i>
                  </li>
                  }
                </>
              ))}
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