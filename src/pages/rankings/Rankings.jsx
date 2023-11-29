import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Rankings = ({baseUrl}) => {
    const [showSignIn, setShowSignIn] = useState(false)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const [rankings, setRankings] = useState([])

    useEffect(() => {
        if(!user) {
            navigate("/")
        }else{
            getRankings()
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

  return (
    <div>
        <div className="all-games flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[37%]">
            <Navbar setShowSignIn={setShowSignIn} baseUrl={baseUrl}/>
            <div className="w-full">
                <div className="flex items-center justify-between my-5">
                    <h2 className='text-lg font-bold text-[#4F3D3D]'>Rankings</h2>
                </div>
            </div>
            <div className='text-left w-full'>
                {rankings && rankings.map(rank => (
                    <div className='flex items-center justify-between my-2 bg-slate-200 p-2 rounded-md'>
                        <p>{rank.username}</p>
                        <p>{rank.joinNumber}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Rankings