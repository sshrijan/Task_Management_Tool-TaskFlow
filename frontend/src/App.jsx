import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import MemberLayout from "./layouts/MemberLayout";

import AdminDashboard from "./admin/AdminDashboard";
import Users from "./admin/Users";
import Projects from "./admin/Projects";
import AdminTasks from "./admin/Tasks";

import MemberDashboard from "./member/MemberDashboard";
import MyTasks from "./member/MyTasks";


function App() {

  return (
    <Router>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<AdminTasks />} />
        </Route>



        {/* Member Routes */}
        <Route
          path="/member"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <MemberLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MemberDashboard />} />
          <Route path="tasks" element={<MyTasks />} />
        </Route>


      </Routes>

    </Router>
  );
}


export default App;