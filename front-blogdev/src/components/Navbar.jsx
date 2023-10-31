import React from 'react'
import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          Blog <span>Dev</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li><NavLink to="/" className={({isActive}) => (isActive ? styles.active :  null)}>Home</NavLink></li>
          <li><NavLink to="/login" className={({isActive}) => (isActive ? styles.active :  null)}>Login</NavLink></li>
          <li><NavLink to="/register" className={({isActive}) => (isActive ? styles.active :  null)}>Cadastro</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => (isActive ? styles.active :  null)}>Sobre</NavLink></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar