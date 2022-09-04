import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Header from "./components/Header";
import CreateUser from "./pages/CreateUser";
import AttendanceList from "./pages/Attendance/AttendanceList";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/attendance" element={<AttendanceList />} />
          </Routes>
        </div>
      </Router>
    </>

  );
}

export default App;
