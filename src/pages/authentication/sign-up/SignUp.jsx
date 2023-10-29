import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div>
        <form className="flex items-center justify-center flex-col bg-[#fff] my-[6rem] p-5 mx-auto w-[30%] sign-up-form">
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
            <p>Already have an account? <Link to="/sign-in" className="underline">sign in</Link> </p>
        </form>
    </div>
  )
}

export default SignUp