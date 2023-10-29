import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <div>
      <div className="all-games flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[37%]">
        <div className='flex items-center justify-between w-full py-5' style={{ borderBottom:"1px solid #4F3D3D" }}>
          <h3>Logo</h3>
          {/* <i class="ri-user-3-line text-lg"></i> */}
          <button className='bg-[#4F3D3D]' onClick={() => navigate("/sign-in")}>Login</button>
        </div>
        <div className='w-full'>
          <h2 className='mt-5 text-lg font-bold text-[#4F3D3D]'>All Games</h2>
          <div className='mt-3 flex items-center gap-3'>
            <button className='bg-[#4F3D3D]'>Played</button>
            <button className='bg-[#797979]'>Unplayed</button>
            <button className='bg-[#797979]'>New</button>
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
    </div>
  )
}

export default Home