import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';
import Loading from '../Components/Loading';

// Helper to wrap components with Suspense
const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);

// Public Routes
const Home = Loadable(lazy(() => import('../pages/public/Home')));
const About = Loadable(lazy(() => import('../pages/public/About')));
const CoursesPage = Loadable(lazy(() => import('../pages/public/Coursespage')));
const ClubsPage = Loadable(lazy(() => import('../pages/public/ClubsPage')));
const ContactPage = Loadable(lazy(() => import('../pages/public/ContactPage')));
const Admission = Loadable(lazy(() => import('../pages/public/Admission')));
const CampusLife = Loadable(lazy(() => import('../pages/public/CampusLife')));
const Login = Loadable(lazy(() => import('../pages/public/Login')));

const CourseDetailPage = Loadable(lazy(() => import('../pages/CourseDetailPage')));
const ClubDetailPage = Loadable(lazy(() => import('../pages/ClubDetailPage')));

// Student Portal
const StudentDashboard = Loadable(lazy(() => import('../pages/student/StudentDashboard')));
const StudentAttendance = Loadable(lazy(() => import('../pages/student/StudentAttendance')));
const Assignments = Loadable(lazy(() => import('../pages/student/Assignments')));
const TimeTable = Loadable(lazy(() => import('../pages/student/TimeTable')));
const Notices = Loadable(lazy(() => import('../pages/student/Notices')));

// Faculty portal
const FacultyDashboard = Loadable(lazy(() => import('../pages/faculty/FacultyDashboard')));
const PostAssignments = Loadable(lazy(() => import('../pages/faculty/PostAssignments')));
const ViewStudents = Loadable(lazy(() => import('../pages/faculty/ViewStudents')));
const StudentDetail = Loadable(lazy(() => import('../pages/faculty/StudentDetail')));
const Timetable = Loadable(lazy(() => import('../pages/faculty/Timetable')));
const FacultyNotices = Loadable(lazy(() => import('../pages/faculty/FacultyNotices')));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/clubs", element: <ClubsPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/Admissions", element: <Admission /> },
      { path: "/CampusLife", element: <CampusLife /> },
      { path: "/courses/:id", element: <CourseDetailPage /> },
      { path: "/clubs/:id", element: <ClubDetailPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
      { path: "/login", element: <Login /> }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/student",
        element: <RoleRoute allowedRole="student" />,
        children: [
          { index: true, element: <Navigate to="Dashboard" replace /> },
          { path: "Dashboard", element: <StudentDashboard /> },
          { path: "Assignments", element: <Assignments /> },
          { path: "Clubs", element: <ClubsPage /> },
          { path: "Attendance", element: <StudentAttendance /> },
          { path: "TimeTable", element: <TimeTable /> },
          { path: "Notices", element: <Notices /> }
        ],
      },
      {
        path: "/faculty",
        element: <RoleRoute allowedRole="faculty" />,
        children: [
          { index: true, element: <FacultyDashboard /> },
          { path: "Assignments", element: <PostAssignments /> },
          { path: "ViewStudents", element: <ViewStudents /> },
          { path: "StudentDetail", element: <StudentDetail /> },
          { path: "TimeTable", element: <Timetable /> },
          { path: "Notices", element: <FacultyNotices /> }
        ],
      },
    ],
  },
]);
