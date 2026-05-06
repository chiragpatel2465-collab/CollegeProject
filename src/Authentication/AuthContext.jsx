// Step 1: import the tools we need
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

// Step 2: create the shared space (the "whiteboard")
const AuthContext = createContext(null);

// Step 3: the Provider component — this wraps your whole app
export function AuthProvider({ children }) {
   
  // This holds the currently logged-in user
  // null means "nobody is logged in yet"
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on initial load
    const checkAuth = async () => {
      try {
        const res = await api.get('/api/auth/me');
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Call this when someone logs in
  const login = (userdata) => {
    setUser(userdata);
  };

  // Call this when someone logs out
  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <span className="flex items-center gap-2 text-purple-900 font-semibold">
          <span className="w-5 h-5 border-2 border-purple-900 border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      </div>
    );
  }

  // Share user, login, logout with the entire app
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Step 4: a clean custom hook so components don't need to
// import AuthContext directly — just import useAuth
export function useAuth() {
  return useContext(AuthContext);
}