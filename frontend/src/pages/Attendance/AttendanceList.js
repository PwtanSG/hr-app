import { useState, useEffect } from 'react'
// import axios from "axios"
import api from '../../api/api'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AttendanceList = () => {
  const navigate = useNavigate()
  const [attendanceList, setAttendanceList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const initStatus = {
    error: false,
    errorMessage: ''
  }
  const [status, setStatus] = useState(initStatus)
  // const API_URL = process.env.REACT_APP_BACKEND_DOMAIN
  // const API_URL = ''
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user?.token) {
    navigate('/login')
  }

  useEffect(() => {
    setLoading(true)

    const getData = async () => {
      try {
        const response = await api({
          method: 'get',
          url: '/api/attendances/list',
          headers: {
            Authorization: `Bearer ${user.token}`,
            // Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTM2ZjJkNWM2ZTdkYTFhODI1MDI5OSIsImlhdCI6MTY2MjI5ODIwNiwiZXhwIjoxNjYyMzAxODA2fQ.BSzYXxecKcTKTH7pNZmGam-2SA0Ta8yrlQi4dd-2Zww",
          },
        })
        setAttendanceList(response.data)
      } catch (err) {
        console.log('err', err)
        setStatus({
          ...status,
          error: true,
          errorMessage: err.response.data.message
        })
      }

    }
    getData()

    setLoading(false)

  }, [])
  
  return (
    <div>
      <h1>Attendance List</h1>
      <div className="container">
        {isLoading && <FaSpinner className="icon_pulse" />}
        {(attendanceList.length > 0) &&
          <table className='attendance'>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Date</th>
                <th>Name</th>
                <th>Time in</th>
                <th>Time out</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && attendanceList.map((attendance, idx) => (
                <tr key={attendance._id}>
                  <td>{idx + 1}</td>
                  <td>{attendance.date}</td>
                  <td>{attendance.name}</td>
                  <td>{attendance.time_in}</td>
                  <td>{attendance.time_out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        {!status.error && !isLoading && attendanceList.length === 0 && <div>No record found.</div>}
        {status.error && <div style={{ color: 'red' }}>{status.errorMessage}</div>}
      </div>
    </div>
  )
}

export default AttendanceList
