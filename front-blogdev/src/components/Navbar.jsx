import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../hooks/useAuth';
import { useAuthValue } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuthValue();
  const { logoutUser } = useAuth();

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
          Blog <span>Dev</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : null)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              About
            </NavLink>
          </li>
          <li>
            {user ? (
              <button onClick={logoutUser} className={styles.logoutButton}>
                Logout
              </button>
            ) : (
              <NavLink
                to='/login'
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                Login
              </NavLink>
            )}
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

        </ul>
      </nav>
    </>
  );
};

export default Navbar;
