import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { userAuthentication } from './hooks/userAuthentication'

function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = userAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if (loadingUser) {
    return <p>Loading...</p>
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />}> </Route>
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />}> </Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
