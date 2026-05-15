import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

// Internal helper — NavLink gives automatic active state
const SidebarLink = ({ icon, label, to }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 font-sans text-sm font-medium
      ${isActive
        ? 'bg-purple-800 text-amber-400 shadow-inner'
        : 'text-purple-200 hover:bg-purple-800/60 hover:text-amber-300'}`
    }
  >
    <span className="text-lg">{icon}</span>
    {label}
  </NavLink>
);

const StudentSidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 h-screen z-50 w-60 bg-purple-900 transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col shadow-2xl lg:shadow-none`}>

        {/* Gold Accent Top Bar */}
        <div className="h-1 bg-amber-400 w-full" />

        {/* Logo Section */}
        <div className="p-6">
          <h1 className="font-serif text-2xl text-amber-400 leading-tight">SSIT College</h1>
          <p className="text-purple-300 text-xs tracking-widest uppercase font-sans">Student Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          <SidebarLink icon="🏠" label="Dashboard"   to="/student/Dashboard" />
          <SidebarLink icon="📋" label="Attendance"  to="/student/Attendence" />
          <SidebarLink icon="📝" label="Assignments" to="/student/Assignments" />
          <SidebarLink icon="📢" label="Notices"     to="/student/Notices" />
          <SidebarLink icon="🗓️" label="Time Table"  to="/student/TimeTable" />
        </nav>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-purple-800 bg-purple-950/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-purple-900 font-bold border-2 border-purple-700">
              {user?.avatar ?? user?.name?.[0] ?? '?'}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-bold truncate">{user?.name}</p>
              <p className="text-purple-300 text-[10px] truncate">{user?.batch ?? user?.department}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded transition-colors flex items-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;
