import React, {useState} from 'react'
import {Link } from 'react-router-dom'
import {FaBars,FaTimes} from 'react-icons/fa'
import './NavbarStyles.css'

const Navbar = () => {
    const[click,setClick]= useState(false)
    const handleClick = () => setClick(!click)


  return (
    <div className='header'>
        <Link to ='/'><h1> HeartOUT </h1></Link>
        <input className= 'searchBar'type='text' placeholder='Search...'></input>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link to= '/'>Home</Link>
            </li>
            <li>
                <Link to= '/confession'>Confession</Link>
            </li>
            <li>
                <Link to= '/adminList'>Admin</Link>
            </li>

        </ul>
        <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size = {20} style={{color:'#fff'}}/>  ): (<FaBars size = {20} style={{color:'#fff'}}/>  )}
            
        </div>
        
    </div>
  )
}

export default Navbar
