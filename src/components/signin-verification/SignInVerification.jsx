import { useState } from 'react'
import ErrorAlert from '../alert/error-alert/ErrorAlert'

const SignInVerification = ({setShowVerifyModal, username, baseUrl}) => {

    const [error, setError] = useState("")
    const [isVerifyLoading, setIsVerifyLoading] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")

    async function verifyAccount(){
        console.log(username)
        console.log(verificationCode)
        if(verificationCode === ""){
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
            console.log(response, data)
        }
    }

  return (
    <div>
        {error && <ErrorAlert error={error} setError={setError}/>}
        <div className='verify-account-bg'>
            <div className='verify-account sign-up-form relative'>
            <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => setShowVerifyModal(false)}></i>
                <h1 className='font-bold text-lg'>Verifying your account</h1>
                <input type="text" placeholder='1234' className='py-1 px-2 mt-6' onChange={e => setVerificationCode(e.target.value)}/>
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