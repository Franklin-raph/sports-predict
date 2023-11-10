import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Rankings = () => {
    const [showSignIn, setShowSignIn] = useState(false)
    const navigate = useNavigate()
    const user = localStorage.getItem("user")

    useEffect(() => {
        if(!user) {
            navigate("/")
        }
    },[])

  return (
    <div>
        <div className="all-games flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[37%]">
            <Navbar setShowSignIn={setShowSignIn} baseUrl={baseUrl}/>
            <div className="w-full">
                <div className="flex items-center justify-between my-5">
                    <h2 className='text-lg font-bold text-[#4F3D3D]'>Rankings</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Rankings