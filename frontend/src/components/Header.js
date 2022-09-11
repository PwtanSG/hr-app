import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }


    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/attendance/myattendance'>Attendance</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt />
                    </Link>
                </li>
                <li>
                    <div onClick={logout}>
                        <FaSignOutAlt />
                    </div>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
