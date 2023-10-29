import React from 'react'

const PlaceBet = ({setShowPlaceBet}) => {
  return (
    <div className='modal-bg'>
        <form className="flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[30%] place-bet-form relative">
        <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => setShowPlaceBet()}></i>
            <h2 className="font-bold text-lg mb-6">Create New Bet</h2>
            <div>
                <label>Game to predict on</label>
                <div className='flex justify-between items-center bg-[#eee] px-2 py-2 text-sm rounded-md' style={{ margin:"2px 0" }}>
                    <p>Select game to predict on</p>
                    <i class="ri-arrow-down-s-fill"></i>
                </div>
            </div>
            <div>
                <label>Predict game outcome</label>
                <div className='flex justify-between items-center bg-[#eee] px-2 py-2 text-sm rounded-md' style={{ margin:"2px 0" }}>
                    <p>Predict game outcome</p>
                    <i class="ri-arrow-down-s-fill"></i>
                </div>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder='****' />
            </div>
            <input type="button" value="Place Bet" className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer"/>
            <p>For frequently asked question, <span className='underline cursor-pointer'>Tap here</span> </p>
        </form>
    </div>
  )
}

export default PlaceBet