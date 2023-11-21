import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { userAuthentication } from '../hooks/userAuthentication';
import { useAuthValue } from '../context/AuthContext';

const Navbar = () => {

  const { user } = useAuthValue()
  const { logoutUser } = userAuthentication()

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
          Blog <span>Dev</span>
        </NavLink>
        <ul className={styles.links_list}>

          <li>
            {user ? (
              <button onClick={logoutUser} className={styles.buttonLogOut}>
                Logout
              </button>
            ) : (
              <NavLink to='/login'
                className={({ isActive }) => (isActive ? styles.active : null)}>Login</NavLink>
            )}
          </li>





          <li>
            <NavLink to='/'
              className={({ isActive }) => (isActive ? styles.active : null)}>Home</NavLink>
          </li>



          {!user && (
            <li>
              <NavLink
                to='/register'
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                Register
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to='/about'
              className={({ isActive }) => (isActive ? styles.active : null)}>About</NavLink>
          </li>

        </ul>
      </nav>
    </>
  )
}

export default Navbar