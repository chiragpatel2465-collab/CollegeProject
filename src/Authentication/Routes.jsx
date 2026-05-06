import {createBrowserRouter, Navigate} from 'react-router-dom'
import RootLayout from '../pages/RootLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';


//     Public Routes
import Home from '../pages/public/Home'
import About from '../pages/public/About'
import CoursesPage from '../pages/public/Coursespage';
import ClubsPage from '../pages/public/ClubsPage';
import ContactPage from '../pages/public/ContactPage';
import Admission from '../pages/public/Admission';
import CampusLife from "../pages/public/CampusLife";
import Login from '../pages/public/Login';

import CourseDetailPage from '../pages/CourseDetailPage';
import ClubDetailPage from '../pages/ClubDetailPage';



//Student Portal
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentAttendance from '../pages/student/StudentAttendance'
import Assignments from '../pages/student/Assignments';
import Notices from '../pages/student/Notices';

//Faculty portal
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import PostAssignments from '../pages/faculty/PostAssignments';
import ViewStudents from '../pages/faculty/ViewStudents';
import StudentDetail from '../pages/faculty/StudentDetail';
import Timetable from '../pages/faculty/TimeTable';
import FacultyNotices from '../pages/faculty/FacultyNotices'


export const router = createBrowserRouter([
 { path : "/",
  element : <RootLayout />,
  children : [ { path : "/",                  element : <Home /> } ,
               {path : "/about",             element : <About />},
               {path : "/courses",           element : <CoursesPage />}, 
               {path : "/clubs",             element : <ClubsPage />},
               {path : "/contact",           element : <ContactPage />},
               {path : "/Admissions",         element : <Admission />},
               {path : "/CampusLife",        element : <CampusLife />},
               {path : "/courses/:id",     element : <CourseDetailPage />},
               {path : "/clubs/:id",       element : <ClubDetailPage />},
               { path : "*",                  element : <Navigate to="/" replace /> },
               {path : "/login",               element : <Login />}]
              
  },

  {
    /* ── AUTH GATE: Check only IF logged in (No role check here) ── */
    element: <ProtectedRoute />,
    children: [
      {
        /* ── STUDENT ONLY ── */
        path: "/student",
        element: <RoleRoute allowedRole="student" />,
        children: [
          { path: "Dashboard", element: <StudentDashboard /> },
          { path: "Assignments", element: <Assignments /> },
          { path: "Attendence" , element : <StudentAttendance />},
          {path : "TimeTable" , element : <Timetable />},
          {path : "Notices" , element : <Notices />}
        ],
      },
      {
        /* ── FACULTY ONLY ── */
        path: "/faculty",
        element: <RoleRoute allowedRole="faculty" />,
        children: [
          { index: true, element: <FacultyDashboard /> },
          { path: "Assignments", element: <PostAssignments /> },
          { path: "ViewStudents" , element : <ViewStudents />},
          {path : "StudentDetail" , element : <StudentDetail />},
          {path : "TimeTable" , element : <Timetable />},
          {path : "Notices" , element : <FacultyNotices />}
        ],
      },
    ],
  },


 ]);