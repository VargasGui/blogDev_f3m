import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Form } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { userAuthentication } from './hooks/userAuthentication'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Post from './pages/Post/Post'
import Search from './pages/Search/Search'
import EditPost from './pages/EditPost/EditPost'



function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = userAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [auth])
  if (loadingUser) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />}></Route>
              <Route path='/post/create' element={user ? <CreatePost /> : <Navigate to="/login" />}></Route>
              <Route path='/posts/:id' element={<Post />}></Route>
              <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to="/login" />}></Route>
              <Route path='/search' element={<Search />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App

