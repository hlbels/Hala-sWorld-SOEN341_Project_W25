import React, {useState} from 'react'
import supabase from '../helper/supabaseClient'
import {Link, useNavigate} from 'react-router-dom'
import '/src/assets/styles/Login.css'


function Login() {

  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [message,setMessage] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage("")

    //Authenticate user & email with supabase
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    //if error exists, display message
    if(error){
      setMessage(error.message) 
      //clear textbox
      setEmail("")
      setPassword("")
      return
    }

    //if success, display message
    if(data){
      navigate('/dashboard')
      return null
    }
  }

  return (
    <div>
          <h2>LOGIN</h2>
          <br></br>
          {message && <span>{message}</span>}
          <form onSubmit={handleSubmit}>
            <input
              type='email' 
              placeholder='Email' 
              required 
              onChange={(e) => setEmail(e.target.value)}></input>
            <input 
              type='password' 
              placeholder='Password'
              value={password}
              required 
              onChange={(e) => setPassword(e.target.value)}></input>
            <button type='submit'>Log in</button>
          </form>
          <span id="register">Don't have an account?</span>
          <Link to="/register">Register</Link>
        </div>
  )
}

export default Login