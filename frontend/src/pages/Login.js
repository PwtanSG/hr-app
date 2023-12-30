// import axios from 'axios'
import api from '../api/api'
import { useState, useEffect } from 'react'
import { FaSignInAlt, FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [isLoading, setLoading] = useState(false)
    //const API_URL = '/api/users/login'

    const navigate = useNavigate()

    const initStatus = {
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
            setLoading(true)
            const response = await api.post('/api/users/login', formData)
            // const response = await axios.post(`${API_URL}/api/users/login`, formData)
            // console.log(response)
            if (response.status === 200) {
                if (response?.data) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    navigate('/users')
                } else {
                    setStatus({
                        ...status,
                        error: true,
                        errorMessage: response.message
                    })
                }
            } else {
                setStatus({
                    ...status,
                    error: true,
                    errorMessage: response.message
                })
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setStatus({
                error: true,
                // errorMessage: 'Login fail.'
                errorMessage: error.response.data.message
            })
            setLoading(false)
        }
    }
    // console.log()
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login your account now</p>
                {isLoading && <FaSpinner className="icon_pulse" />}
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
                    {status.error && <div className='danger'>{status.errorMessage}</div>}
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </form>
            </section>
        </>
    )
}

export default Login
