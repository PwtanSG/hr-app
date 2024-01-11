import { useState, useEffect } from "react"
// import axios from "axios"
import api from '../api/api'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'

const Users = () => {
    const [userList, setUserList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const initStatus = {
        error: false,
        errorMessage: ''
    }
    const [status, setStatus] = useState(initStatus)
    const API_URL = '/api/users/list'
    // console.log('user',user['token'])
    // console.log(user?.token? user.token ? :'')
    const navigate = useNavigate()

    let user = null
    useEffect(() => {
        setLoading(true)
        if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (!user?.token) {
                navigate('/login')
            }
            const getData = async () => {
                try {
                    // const response = await api({
                    //     method: 'get',
                    //     url: API_URL,
                    //     // headers: {
                    //     //     Authorization: `Bearer ${user.token}`,
                    //     //     // Authorization: 'Bearer '+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTM2ZjJkNWM2ZTdkYTFhODI1MDI5OSIsImlhdCI6MTY2MjI4NjI3NiwiZXhwIjoxNjYyMjg5ODc2fQ.okaYOqaR5LlnrhFLWY5YSKiN0SSt1jWIxbebbEZNfWU",
                    //     // },
                    // })
                    const response = await api.get(API_URL)
                    console.log(response)
                    setUserList(response.data)
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
        } else {
            navigate('/login')
        }


    }, [API_URL])

    const columns = [
        // {
        //     name: 'ID',
        //     selector: row => row._id,
        //     sortable: true,
        // },
        {
            name: 'Staff No.',
            selector: row => row.staff_no,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'Designation',
            selector: row => row.designation,
            sortable: true,
        },

    ];

    return (
        <div>
            <DataTable
                title="User List"
                columns={columns}
                data={userList}
                pagination
            />
            {/* <h1>Users</h1>
            <div className="container">
                {isLoading && <FaSpinner className="icon_pulse"/> }
                {(userList.length > 0) &&
                    <table>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Staff No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Designation</th>
                                <th>Admin</th>

                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading && userList.map((user, idx) => (
                                <tr key={user._id}>
                                    <td>{idx + 1}</td>
                                    <td>{user.staff_no}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.address}</td>
                                    <td>{user.designation}</td>
                                    <td>{user.is_admin? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {!status.error && !isLoading && userList.length === 0 && <div>No user found.</div>}
                {status.error && <div style={{color:'red'}}>{status.errorMessage}</div>}
            </div> */}
        </div>
    )
}

export default Users
