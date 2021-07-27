import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
        setUser(user);
        setLoading(false);
         if(user){
             console.log(user)
             history.push('/chats')
            }
    });
  }, [user, history]);
  const value = user;
  return(
      <AuthContext.Provider value={value}>
      {!loading && children}
      </AuthContext.Provider>
  )
}
