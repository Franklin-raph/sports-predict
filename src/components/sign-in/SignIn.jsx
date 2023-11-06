import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorAlert from '../alert/error-alert/ErrorAlert'

const SignIn = ({setShowSignIn, setShowSignUp, baseUrl}) => {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    async function handleUserSignIn(e){
        e.preventDefault()
        if(!username || !password){
            setError("Please fill in all fields")
        }else{
            setIsLoading(true)
            const response = await fetch(`${baseUrl}/user/login`,{
                method:"POST",
                body:JSON.stringify({username, password}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response) setIsLoading(false)
            const data = await response.json()
            console.log(response, data)
            if(response) setIsLoading(false)
            if(response.ok){
                localStorage.setItem("user", JSON.stringify(data))
                setShowSignIn(false)
            }
            if(!response.ok){
                setError(data.message)
            }
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
                <label>Username</label>
                <input type="text" placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder='****' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {isLoading ?
                <button className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 w-full rounded-md cursor-not-allowed">
                    <i class="fa-solid fa-gear fa-spin"></i>
                </button>
                :
                <button type="submit" disabled={isLoading} className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer w-full rounded-md">
                    Sign In
                </button>
            }
            <p>Don't have an account? <span onClick={() => openSignUp()} className="underline cursor-pointer">sign up</span> </p>
        </form>
        {error && <ErrorAlert error={error} setError={setError}/> }
    </div>
  )
}

export default SignIn