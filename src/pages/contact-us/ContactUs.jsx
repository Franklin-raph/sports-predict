import React from 'react'
import Navbar from '../../components/navbar/Navbar'

const ContactUs = () => {
  return (
    <div>
        <div className="all-games flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[37%]">
            <Navbar />
            <div className="w-full">
                <div className="flex items-center justify-between my-5">
                    <h2 className='text-lg font-bold text-[#4F3D3D]'>Contact Us</h2>
                    <p>#50,000</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUs