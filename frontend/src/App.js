import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import UserList from "./pages/UserList";
import Header from "./components/Header";
import CreateUser from "./pages/CreateUser";
import MyAttendance from "./pages/Attendance/MyAttendances";
import AttendanceList from "./pages/Attendance/AttendanceList";
import UnAuthorizedScreen from "./pages/UnAuthorizedScreen"
import NotFoundScreen from "./pages/NotFoundScreen";
import Staff from "./pages/Staff";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/attendance/myattendance" element={<MyAttendance />} />
            <Route path="/attendance/list" element={<AttendanceList />} />
            <Route path="/unauthorized" element={<UnAuthorizedScreen />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default App;
