import { useState } from 'react'
import ErrorAlert from '../alert/error-alert/ErrorAlert'
import SuccessAlert from '../alert/success-alert/SuccessAlert'
import SignIn from '../sign-in/SignIn'

const SignInVerification = ({setShowSignInVerificationModal, baseUrl}) => {

    const [error, setError] = useState("")
    const [isVerifyLoading, setIsVerifyLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [success, setSuccess] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")
    const [showSignIn, setShowSignIn] = useState(false)

    async function verifyAccount(){
        console.log(JSON.stringify({username, code:verificationCode}))
        // console.log(verificationCode)
        if(verificationCode === "" || username === ""){
            setError("Please fill in the verification code")
            return
        }else{
            setIsVerifyLoading(true)
            const response = await fetch(`${baseUrl}/user/verify-code`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({username, code:verificationCode})
            })
            const data = await response.json()
            if(response) setIsVerifyLoading(false)
            if(!response.ok){
                setError(data.message)
            }
            if(response.ok){
                setSuccess(data.message)
            }
            console.log(response, data)
        }
    }

  return (
    <div>
        {error && <ErrorAlert error={error} setError={setError}/>}
        {showSignIn && <SignIn baseUrl={baseUrl} setShowSignIn={setShowSignIn}/>  }
        {success && <div className='modal-bg'>
            <div className="error-modal bg-[#fff] w-[25%] h-[30%] text-center flex items-center justify-center flex-col relative">
                <i class="ri-check-fill text-4xl mb-4 text-green-500"></i>
                <p>{success}</p>
                <button className='bg-[#4F3D3D] mt-3 text-white mb-2 py-2 px-4 rounded-md' onClick={() => {
                    setShowSignIn(true)
                    setSuccess(false)
                    setShowSignInVerificationModal(false)
                }}>Continue to login</button>
            </div>
          </div>
          }
        <div className='verify-account-bg z-[99]'>
            <div className='verify-account sign-up-form relative'>
            <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => setShowSignInVerificationModal(false)}></i>
                <h1 className='font-bold text-lg'>Verifying your account</h1>
                <input type="text" placeholder='Username' className='py-1 px-2 mt-6' onChange={e => setUsername(e.target.value)}/>
                <input type="text" placeholder='1234' className='py-1 px-2 mt-3' onChange={e => setVerificationCode(e.target.value)}/>
                <ul className='text-left mt-5 flex flex-col gap-2'>
                    <li className='flex items-center gap-2'>
                        <span className='p-2 bg-gray-400 rounded-full'></span>
                        <p className='text-sm'>Tap <a href='https://t.me/thesbc_bot' target='_blank' className='underline'>here</a> to start telegram authentication </p>
                    </li>
                    <li className='flex items-center gap-2'>
                        <span className='p-2 bg-gray-400 rounded-full'></span>
                        <p className='text-sm'>Verify your unique ID on our telegram bot</p>
                    </li>
                    <li className='flex items-center gap-2'>
                        <span className='p-2 bg-gray-400 rounded-full'></span>
                        <p className='text-sm'>Type in the unique ID in the input box above and click on verify</p>
                    </li>
                    {isVerifyLoading ?
                        <button className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                            <i class="fa-solid fa-gear fa-spin"></i>
                        </button>
                        :
                        <button type="submit" disabled={isVerifyLoading} onClick={verifyAccount} className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                            Verify Account
                        </button>
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SignInVerification