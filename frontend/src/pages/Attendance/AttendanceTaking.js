import axios from "axios"
import moment from 'moment'

const AttendanceTaking = () => {
    const today = moment().format("DD-MMM-YYYY")
    return (
        <>
            <div className="container">
                <h1>Attendance</h1>
                <h2>{today}</h2>
                <div>Clock In Time : </div>
                <div>Clock Out Time : </div>
            </div>
        </>
    )
}

export default AttendanceTaking
