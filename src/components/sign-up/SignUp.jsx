import React, { useState } from 'react'
import ErrorAlert from '../alert/error-alert/ErrorAlert'

const SignUp = ({setShowSignUp, setShowSignIn, baseUrl}) => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [verifyModal, setVerifyModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    console.log(isLoading)

    function closeSigUp(){
        setShowSignUp(false)
    }

    function openSignIn(){
        setShowSignUp(false)
        setShowSignIn(true)
    }

    async function handleUserSignUp(e){
        e.preventDefault()
        if(!email || !password || !phone || !name || !confirmPassword){
            setError("Please fill in all fields")
        }else if(password !== confirmPassword){
            setError("Please both password fields must match")
        }else{
            // console.log(JSON.stringify({email, password, phone, name}))
            setIsLoading(true)
            const response = await fetch(`${baseUrl}/user/create-account`,{
                method:"POST",
                body:JSON.stringify({email, password, phone, username:name}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            console.log(response, data)
            if(response) setIsLoading(false)
            if(response.ok){
                setVerifyModal(true)
            }
            if(!response.ok){
                setError(data.message)
            }
            
            // localStorage.setItem("user", JSON.stringify(email))
        }
    }

  return (
    <div className='modal-bg'>
        <form className="flex items-center justify-center flex-col bg-[#fff] p-5 mx-auto w-[30%] sign-up-form relative mt-[3rem]" onSubmit={handleUserSignUp}>
            <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => closeSigUp()}></i>
            <h2 className="font-bold text-lg mb-6">Personal Information</h2>
            <div>
                <label>Name</label>
                <input type="text" placeholder='name' onChange={e => setName(e.target.value)} value={name}/>
            </div>
            <div>
                <label>Email</label>
                <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)} value={email}/>
            </div>
            <div>
                <label>Phone</label>
                <input type="number" placeholder='Phone No.' onChange={e => setPhone(e.target.value)} value={phone}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder='****' onChange={e => setPassword(e.target.value)} value={password}/>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" placeholder='****' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
            </div>
            {/* <input type="submit" value="Sign Up" className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer"/> */}
            
            {isLoading ?
                <button className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                    <i class="fa-solid fa-gear fa-spin"></i>
                </button>
                :
                <button type="submit" disabled={isLoading} className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                    Sign Up
                </button>
            }
            <p>Already have an account? <span onClick={() => openSignIn()} className="underline cursor-pointer">sign in</span> </p>
        </form>
        {error && <ErrorAlert error={error} setError={setError}/>}

        {verifyModal && 
            <div className='verify-account-bg'>
                <div className='verify-account sign-up-form relative'>
                <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => setVerifyModal(false)}></i>
                    <h1 className='font-bold text-lg'>Verifying your account</h1>
                    <input type="email" placeholder='1234' className='py-1 px-2 mt-6'/>
                    <ul className='text-left mt-5 flex flex-col gap-2'>
                        <li className='flex items-center gap-2'>
                            <span className='p-2 bg-gray-400 rounded-full'></span>
                            <p className='text-sm'>Tap on the box below to copy the unique ID</p>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='p-2 bg-gray-400 rounded-full'></span>
                            <p className='text-sm'>Tap <span className='underline'>here</span> to start telegram authentication </p>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='p-2 bg-gray-400 rounded-full'></span>
                            <p className='text-sm'>Verify your unique ID on our telegram bot</p>
                        </li>
                    </ul>
                </div>
            </div>
        }
        
    </div>
  )
}

export default SignUp