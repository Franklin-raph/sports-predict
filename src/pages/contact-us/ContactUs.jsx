import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const ContactUs = ({baseUrl}) => {
    const [showSignIn, setShowSignIn] = useState(false)
    const user = localStorage.getItem("user")
    const navigate = useNavigate()

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
                    <h2 className='text-lg font-bold text-[#4F3D3D]'>Contact Us</h2>
                </div>
                <div>
                    <p className='text-center'>You can contact us via our</p>
                    <div className='mt-5 text-[14px] text-[#4F3D3D]'>
                        <div>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-bold mb-2'>Telegram Channel</h1>
                                <a href="https://t.me/cryptoversity12" target='_blank'>
                                    <i class="ri-telegram-fill text-[20px]"></i>
                                </a>
                            </div>
                            <a href="https://t.me/cryptoversity12" target='_blank'>telegram Link</a>
                        </div>
                        <div className='mt-5'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-bold mb-2'>Facebook Page</h1>
                                <a href="#">
                                    <i class="ri-facebook-circle-fill text-[20px]"></i>
                                </a>
                            </div>
                            <a href="#">facebook Link</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUs