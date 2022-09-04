import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'


const CreateUser = () => {
  const initFormData = {
    name: '',
    email: '',
    password: '',
    password2: '',
  }
  const [formData, setFormData] = useState(initFormData)

  const onChangeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    })
    )
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Create New User
        </h1>
      </section>
      <section className='form'>
        <form onSubmit={onSubmitHandler}>
          <div className='form-group'>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              placeholder='Enter name'
              onChange={onChangeHandler}
            ></input>
          </div>
          <div className='form-group'>
            <input
              type='text'
              id='email'
              name='email'
              value={formData.email}
              placeholder='Enter email'
              onChange={onChangeHandler}
            ></input>
          </div>
          <div className='form-group'>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              placeholder='Enter password'
              onChange={onChangeHandler}
            ></input>
          </div>
          <div className='form-group'>
            <input
              type='password'
              id='password2'
              name='password2'
              value={formData.password2}
              placeholder='Confirm password2'
              onChange={onChangeHandler}
            ></input>
          </div>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </form>
      </section>
    </>
  )
}



export default CreateUser