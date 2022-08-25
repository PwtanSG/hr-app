import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaSignInAlt, FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const API_URL = '/api/users/login'
    // const API_URL = 'http://localhost:5000/api/users/login'
    const test = ":"
    const navigate = useNavigate()

    const initStatus = {
        loading: false,
        error: false,
        errorMessage: ''
    }
    const [status, setStatus] = useState(initStatus)

    const initFormData = {
        email: '',
        password: '',
    }
    const [formData, setFormData] = useState(initFormData)

    const onChangeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        })
        )
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(API_URL, formData)
            console.log(response)
            if (response.status === 200) {
                if (response?.data){
                    localStorage.setItem('user', JSON.stringify(response.data))
                    // console.log('0000')
                    navigate('/users')
                }else{
                    setStatus({
                        ...status, 
                        error:true, 
                        errorMessage: response.message
                    })
                }
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log()
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login your account</p>
                <FaSpinner />
            </section>
            <section className='form'>
                <form onSubmit={onSubmitHandler}>
                    <div className='form-group'>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            value={formData.email}
                            placeholder='Enter your email'
                            onChange={onChangeHandler}
                        ></input>
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData.password}
                            placeholder='Enter your password'
                            onChange={onChangeHandler}
                        ></input>
                    </div>
                    {status.error && <div>Error</div>}
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </form>
            </section>
        </>
    )
}

export default Login
