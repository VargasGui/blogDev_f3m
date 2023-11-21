import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'

import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Loading....</p>;
  }
  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
              <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>} />
              <Route path="*" element={<h1>Not Found</h1>} />

            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;