import {useState} from 'react'
import { Link } from 'react-router-dom'
import ErrorAlert from '../alert/error-alert/ErrorAlert'

const SignIn = ({setShowSignIn, setShowSignUp, baseUrl}) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    async function handleUserSignIn(e){
        e.preventDefault()
        if(!email || !password){
            setError("Please fill in all fields")
        }else{
            const response = await fetch(`${baseUrl}/user/login`,{
                method:"POST",
                body:JSON.stringify({email, password}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            console.log(response, data)
            setShowSignIn(false)
            // localStorage.setItem("user", JSON.stringify(email))
        }
    }

    function closeSignIn(){
        setShowSignIn(false)
    }

    function openSignUp(){
        setShowSignIn(false)
        setShowSignUp(true)
    }

  return (
    <div className='modal-bg'>
        <form className="flex items-center justify-center flex-col bg-[#fff] mt-[9rem] p-5 mx-auto w-[27%] sign-up-form relative" onSubmit={handleUserSignIn}>
            <i className="ri-close-fill absolute right-2 top-2 text-2xl text-[#4F3D3D] hover:text-gray-500 cursor-pointer" onClick={() => closeSignIn()}></i>
            <h2 className="font-bold text-lg mb-6">Sign In</h2>
            <div>
                <label>Email</label>
                <input type="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder='****' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Sign in" className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer"/>
            <p>Don't have an account? <span onClick={() => openSignUp()} className="underline cursor-pointer">sign up</span> </p>
        </form>
        {error && <ErrorAlert error={error} setError={setError}/> }
    </div>
  )
}

export default SignIn