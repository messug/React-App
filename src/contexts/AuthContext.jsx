import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext( )

export function UseAuth(){
  return useContext(AuthContext)
}

export  function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const[loading,setLoading] = useState(true)
  
function Signup(email,password){
  return auth.createUserWithEmailAndPassword(email, password)
  }
  
function Login(email,password){
    return auth.signInWithEmailAndPassword(email, password)
    }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user)
    })
  return unsubscribe
  }, [])
  

  const value = {
    currentUser,
    Signup,
    Login
  }
  return (

    <div>
    <AuthContext.Provider value ={value}>
      {!loading && children}
    
    </AuthContext.Provider>
    </div>
  )
}

