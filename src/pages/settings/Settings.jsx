import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Settings = ({baseUrl}) => {
    const user = localStorage.getItem("user")
    const [showSignIn, setShowSignIn] = useState(false)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [bank, setBank] = useState("")
    const [accountName, setAccountName] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const tabsArray = ["User Info", "Security", "Account Info"]
    const [activeTab, setActiveTab] = useState(tabsArray[0])
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) {
            navigate("/")
        }
    },[])

    function handleTabClick(tab){
        setActiveTab(tab);
    }

  return (
    <div className='settings'>
        <div className="all-games flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[37%]">
            <Navbar setShowSignIn={setShowSignIn} baseUrl={baseUrl}/>
            <div className="w-full">
                <div className="flex items-center justify-between my-5">
                    <h2 className='text-lg font-bold text-[#4F3D3D]'>Settings</h2>
                </div>
                <div className="tabs flex gap-4 tab-btns pb-1" style={{ borderBottom:"1px solid gray" }}>
                    {tabsArray.map((tab, index) => (
                        <p
                            key={index}
                            className={`tab-item ${activeTab === tab ? 'active-tab' : ''}`}
                            onClick={() => handleTabClick(tab)}
                            style={{ fontSize:"14px" }}>
                            {tab}
                        </p>
                    ))}
                </div>

                {activeTab === "User Info" &&
                    <div>
                        <div className='mt-4'>
                            <label>Email</label>
                            <input type="email" onChange={e => setEmail(e.target.value)} className='w-full' style={{ outline:"none", border:"1px solid balck" }}/>
                        </div>
                        <div className='mt-4'>
                            <label>Phone Number</label>
                            <input type="number" onChange={e => setPhone(e.target.value)} className='w-full'/>
                        </div>
                        {isLoading ?
                            <button className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                                <i class="fa-solid fa-gear fa-spin"></i>
                            </button>
                            :
                            <button type="submit" disabled={isLoading} className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                                Update
                            </button>
                        }
                    </div>
                }

                {activeTab === "Security" && 
                    <div>
                        <div className='mt-4'>
                            <label>Old Password</label>
                            <input type="password" onChange={e => setOldPassword(e.target.value)} className='w-full' style={{ outline:"none", border:"1px solid balck" }}/>
                        </div>
                        <div className='mt-4'>
                            <label>New Password</label>
                            <input type="password" onChange={e => setNewPassword(e.target.value)} className='w-full'/>
                        </div>
                        <div className='mt-4'>
                            <label>Confirm Password</label>
                            <input type="password" onChange={e => setConfirmPassword(e.target.value)} className='w-full'/>
                        </div>
                        {isLoading ?
                            <button className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                                <i class="fa-solid fa-gear fa-spin"></i>
                            </button>
                            :
                            <button type="submit" disabled={isLoading} className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                                Update Password
                            </button>
                        }
                    </div>
                }

                {activeTab === "Account Info" && 
                    <div>
                        <div className='mt-4'>
                            <label>Bank</label>
                            <input type="text" onChange={e => setBank(e.target.value)} className='w-full'/>
                        </div>
                        <div className='mt-4'>
                            <label>Account Name</label>
                            <input type="text" onChange={e => setAccountName(e.target.value)} className='w-full' style={{ outline:"none", border:"1px solid balck" }}/>
                        </div>
                        <div className='mt-4'>
                            <label>Account Number</label>
                            <input type="number" onChange={e => setAccountNumber(e.target.value)} className='w-full'/>
                        </div>
                        {isLoading ?
                            <button className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                                <i class="fa-solid fa-gear fa-spin"></i>
                            </button>
                            :
                            <button type="submit" disabled={isLoading} className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                                Update Account Details
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Settings