import React from 'react'

const SuccessAlert = ({success, setSuccess, setShowPlaceBet}) => {
  return (
    <div className='modal-bg'>
      <div className="error-modal bg-[#fff] w-[25%] h-[20%] text-center flex items-center justify-center flex-col relative">
        <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => {
          setSuccess(false)
          setShowPlaceBet(false)
          }}>
          </i>
        <i class="ri-check-fill text-4xl mb-4 text-green-500"></i>
        <p>{success}</p>
      </div>
    </div>
  )
}

export default SuccessAlert