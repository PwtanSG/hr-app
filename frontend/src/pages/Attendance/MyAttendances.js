import { useState, useEffect } from 'react'
import axios from "axios"
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const MyAttendances = () => {
    const navigate = useNavigate()
    const [attendanceList, setAttendanceList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const initStatus = {
        error: false,
        errorMessage: ''
    }
    const [status, setStatus] = useState(initStatus)
    const API_URL = process.env.REACT_APP_BACKEND_DOMAIN
    // const API_URL = ''
    const today = moment().format("DD-MMM-YYYY")

    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.token) {
      navigate('/login')
    }
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: `${API_URL}/api/attendances/myattendance`,
                    headers: {
                        Authorization: `Bearer ${user.token}`,
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

    }, [API_URL])

    return (
        <>
            <div className="container">
                <h1>My Attendance</h1>
                <h2>Today : {today}</h2>
                <div>Clock In Time : </div>
                <div>Clock Out Time : </div>
                {isLoading && <FaSpinner className="icon_pulse" />}
            </div>
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

        </>
    )
}

export default MyAttendances
