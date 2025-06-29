
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const {user} = useSelector((state) => state.auth);
    const {register, handleSubmit, formState:{errors}}=  useForm();

   const navigate = useNavigate();

   const submitHandler = async (data) => {
     // Save whatever is input as userInfo in cookie (for easy bypass)
     document.cookie = `userInfo=${encodeURIComponent(JSON.stringify({ email: data.email, password: data.password }))}; path=/;`;
     window.location.href = '/dashboard';
   }

    useEffect(()=>{
        user && navigate('/dashboard')
    }, [user]);


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="../assets/DoneZoLogo.png" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      {/* Forms Start */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" onSubmit={handleSubmit(submitHandler)} >
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input 
                type="email" 
                name="email" 
                id="email" 
                autoComplete="email" 
                required
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input 
                type="password" 
                name="password" 
                id="password" 
                autoComplete="current-password" 
                required
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member? 
          { ' ' } 
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  )
}

export default Login