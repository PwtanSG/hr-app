import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import UserList from "./pages/UserList";
import Header from "./components/Header";
import CreateUser from "./pages/CreateUser";
import AttendanceTaking from "./pages/Attendance/AttendanceTaking";
import AttendanceList from "./pages/Attendance/AttendanceList";
import UnAuthorizedScreen from "./pages/UnAuthorizedScreen"
import Staff from "./pages/Staff";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/attendance" element={<AttendanceTaking />} />
            <Route path="/attendancelist" element={<AttendanceList />} />
            <Route path="/unauthorized" element={<UnAuthorizedScreen />} />
            <Route path="/staff" element={<Staff />} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default App;
