import React from 'react'

const ErrorAlert = ({error, setError, showVerifyBtn, setShowSignIn, setShowVerifyModal, showVerifyModal}) => {
  // console.log(setShowVerifyModal)
  function openVerifyModal(){
    setError(false)
    // setShowSignIn(false)
  }
  return (
    <div className='modal-bg'>
      <div className="error-modal bg-[#fff] w-[25%] h-[30%] text-center flex items-center justify-center flex-col relative">
        <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => setError(false)}></i>
        <i class="ri-close-circle-fill text-4xl mb-4 text-red-500"></i>
        <p>{error}</p>
        {showVerifyBtn && <button className='bg-[#4F3D3D] text-white px-3 py-1 mt-4 rounded-[4px]' onClick={openVerifyModal}>Verify now</button> }
      </div>
    </div>
  )
}

export default ErrorAlert