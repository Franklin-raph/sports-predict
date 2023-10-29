import React, { useState } from 'react'
import ErrorAlert from '../alert/error-alert/ErrorAlert'

const SignUp = ({setShowSignUp, setShowSignIn}) => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    function closeSigUp(){
        setShowSignUp(false)
    }

    function openSignIn(){
        setShowSignUp(false)
        setShowSignIn(true)
    }

    async function handleUserSignUp(e){
        e.preventDefault()
        if(!email || !password || !name || !confirmPassword){
            setError("Please fill in all fields")
        }else{
            localStorage.setItem("user", JSON.stringify(email))
        }
    }

  return (
    <div className='modal-bg'>
        <form className="flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[30%] sign-up-form relative" onSubmit={handleUserSignUp}>
        <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => closeSigUp()}></i>
            <h2 className="font-bold text-lg mb-6">Personal Information</h2>
            <div>
                <label>Name</label>
                <input type="text" placeholder='name' />
            </div>
            <div>
                <label>Email</label>
                <input type="email" placeholder='email' />
            </div>
            <div>
                <label>Phone</label>
                <input type="number" placeholder='Phone No.' />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder='****' />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" placeholder='****' />
            </div>
            <input type="submit" value="Sign Up" className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer"/>
            <p>Already have an account? <span onClick={() => openSignIn()} className="underline cursor-pointer">sign in</span> </p>
        </form>
        {error && <ErrorAlert error={error} setError={setError}/> }
    </div>
  )
}

export default SignUp