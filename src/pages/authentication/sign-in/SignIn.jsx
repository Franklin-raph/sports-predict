import {useState} from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    async function handleUserSignIn(){
        if(!email || !password){
            setError("Please fill in all fields")
        }
    }

  return (
    <div>
        <form className="flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[27%] sign-up-form" onSubmit={handleUserSignIn}>
            <h2 className="font-bold text-lg mb-6">Sign In</h2>
            <div>
                <label>Email</label>
                <input type="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder='****' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Sign Up" className="bg-[#4F3D3D] mt-3 text-white mb-2 py-2 cursor-pointer"/>
            <p>Don't have an account? <Link to="/sign-up" className="underline">sign up</Link> </p>
        </form>
    </div>
  )
}

export default SignIn