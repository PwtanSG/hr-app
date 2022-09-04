import { useState, useEffect } from 'react'
import axios from "axios"
import { FaSpinner } from 'react-icons/fa'

const AttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const initStatus = {
    error: false,
    errorMessage: ''
  }
  const [status, setStatus] = useState(initStatus)
  const API_URL = process.env.REACT_APP_BACKEND_DOMAIN
  const user = localStorage.getItem('user')

  useEffect(() => {
    setLoading(true)

    const getData = async () => {
      try {
        // const response = await axios.get(`${API_URL}/api/attendances/`)
        const response = await axios({
          method: 'get',
          url: `${API_URL}/api/attendances/`,
          // url: process.env.REACT_APP_API_URL + '/user/getPermissionsByUser',
          headers: {
            // Authorization: `Bearer ${user.token}`,
            Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTM2ZjJkNWM2ZTdkYTFhODI1MDI5OSIsImlhdCI6MTY2MjI4ODQyNiwiZXhwIjoxNjYyMjkyMDI2fQ.MDX4F3TOR2HLRFWlQgb8Y6-1vz9TCfHkdKVq42n-O84",
          },
        })
        console.log(response)
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

  }, [API_URL])
  return (
    <div>
      <h1>Attendance List</h1>
      <div className="container">
        {isLoading && <FaSpinner className="icon_pulse" />}
        {(attendanceList.length > 0) &&
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>User</th>
                <th>Date</th>
                <th>Time in</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && attendanceList.map((attendance, idx) => (
                <tr key={attendance._id}>
                  <td>{idx + 1}</td>
                  <td>{attendance.user}</td>
                  <td>{attendance.date}</td>
                  <td>{attendance.time_in}</td>
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
