import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Rankings = ({baseUrl}) => {
    const [showSignIn, setShowSignIn] = useState(false)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [rankings, setRankings] = useState([])
    const rankTabs = ["Daily", "Weekly", "All-Time"]
    const [activeTab, setActiveTab] = useState("")

    useEffect(() => {
        if(!user) {
            navigate("/")
        }else{
            getRankings()
            setActiveTab("Daily")
        }
    },[])

    async function getRankings() {
        const response = await fetch(`${baseUrl}/get/leaderboard/`, {
            method:"GET",
            headers:{
              Authorization: `Bearer ${user.token}`
            }
        })
        const data = await response.json()
        if(response.ok){
            setRankings(data.message)
        }
        console.log(rankings, data)
    }

    function handleTabClick(tab){
        setActiveTab(tab)
    }

  return (
    <div>
        <div className="all-games flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[37%]">
            <Navbar setShowSignIn={setShowSignIn} baseUrl={baseUrl}/>
            <div className="w-full">
                <div className="flex items-center justify-between my-5">
                    <h2 className='text-lg font-bold text-[#4F3D3D]'>Rankings</h2>
                </div>
            </div>
            <div className='flex items-center gap-5 justify-start w-full'>
                {rankTabs.map((rank, index) => (
                    <button
                        key={index}
                        className={`home-tab ${activeTab === rank ? 'active-tab' : ''}`}
                        onClick={() => handleTabClick(rank)}
                        >{rank}
                    </button>
                ))}
            </div>
            <div className='text-left w-full mt-5'>
                {rankings && rankings.map((rank, index) => (
                    <div className='flex items-center justify-between my-2 bg-slate-200 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <p className='font-bold text-gray-400'>#{index + 1}</p>
                            <p>{rank.username}</p>
                        </div>
                        <p className='font-bold text-gray-400'>₦ {rank.balance}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Rankings