// Step 1: import the tools we need
import { createContext, useContext, useState} from 'react';


// Step 2: create the shared space (the "whiteboard")
const AuthContext = createContext(null);

// Step 3: the Provider component — this wraps your whole app
export function AuthProvider({ children }) {
   
  // This holds the currently logged-in user
  // null means "nobody is logged in yet"
  const [user, setUser] = useState(null);


  // Call this when someone logs in
  const login = async(userdata) => {
    await setUser(userdata);
   
  };

  // Call this when someone logs out
  const logout = async () =>{
      setUser(null);
    };



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