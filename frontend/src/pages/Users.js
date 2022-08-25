import { useState, useEffect } from "react"
import axios from "axios"
// import axios from "../api/axios"

const Users = () => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        // try {
        //     const response = await axios.get('/api/users/list')
        //     console.log(response)
        // } catch (err) {
        //     console.log(err)
        // }
        axios.get('http://localhost:5000/api/users/list')
            .then(function (response) {
                // handle success
                console.log(response.data);
                setUserList(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])
    // console.log(userList)
    // console.log(userList[0].name)
    // const name = (userList.length > 0) ? userList[0].name : 0
    return (
        <div>
            <h1>Users</h1>
            {userList.map((user, idx) => {
                return (
                    <div key={idx}>
                        {user.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Users
