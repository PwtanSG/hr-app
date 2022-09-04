import { useState, useEffect } from "react"
import axios from "axios"

// import axios from "../api/axios"

const Users = () => {
    const [userList, setUserList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const API_URL = process.env.REACT_APP_BACKEND_DOMAIN

    // const API_URL = 'http://localhost:5000'

    useEffect(() => {
        setLoading(true)
        // const getData = async () => {
        //     try {
        //         const response = await axios.get(`${API_URL}/api/users/list`)
        //         setUserList(response.data)

        //     } catch (err) {
        //         console.log(err)
        //     }
            
        // }
        // getData()

        axios.get(`${API_URL}/api/users/list`)
            // axios.get('/api/users/list')
            .then(function (response) {
                // handle success
                console.log(response.data)
                setUserList(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        setLoading(false)

    }, [API_URL])

    return (
        <div>
            <h1>Users</h1>
            <div className="container">
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
                {!isLoading && userList.length === 0 && <div>No user found.</div>}
            </div>
        </div>
    )
}

export default Users
