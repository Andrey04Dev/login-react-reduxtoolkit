import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/UserSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch =  useDispatch()
    const navigate =  useNavigate()
    const {loading,error} =  useSelector(state=> state.user)

    const handleSubmitEvent =(e) =>{
        e.preventDefault()
        let userCredentials = {
            email,password
        }
        dispatch(loginUser(userCredentials)).then((result)=> {
            if (result.payload) {
                setEmail("")
                setPassword("")
                navigate("/")
            }
        })
    }
  return (
    <form className='form-group custom-form' onSubmit={handleSubmitEvent}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required className='form-control' value={email} onChange={e=> setEmail(e.target.email)} />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required className='form-control' value={password} onChange={e=> setPassword(e.target.password)} />
        <br />
        <button type='submit' className='btn btn-success btn-md'>{loading ? "Loading...": "LOGIN"}</button>
        {error && (
            <div className='alert alert-danger' role='alert'>{error}</div>
        )}
    </form>
  )
}

export default Login