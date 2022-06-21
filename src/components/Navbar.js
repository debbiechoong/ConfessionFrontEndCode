import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars,FaTimes } from 'react-icons/fa'
import './NavbarStyles.css'
import PostService from '../services/PostService'

const Navbar = () => {

    const[click,setClick]= useState(false)
    const [show, setShow] = useState(true)
    const [searchDetail, setSearchDetail] = useState('');
    const [relatedPosts, setRelatedPosts] = useState([]);

    const controlNavbar = () => {
        if (window.scrollY > 100) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [])

    const changeSearchDetail = (e) => {
        setSearchDetail(e.target.value);
    }

    const searchPost = (e) => {
        e.preventDefault();
        setRelatedPosts([]);
        let formattedSearchDetail = searchDetail;
        if (searchDetail.startsWith('#')) {
            formattedSearchDetail = formattedSearchDetail.replace('#', '');
        }
        PostService.searchPosts(formattedSearchDetail).then(res => {
            setRelatedPosts(res.data);
        })
      }
      
    const handleClick = () => setClick(!click)


  return (
    <div className={`nav ${show && 'header'}`}>
        <Link to ='/'><h1> HeartOUT </h1></Link>
        <input className= 'searchBar'
                type='text' 
                placeholder='Search...'
                value={searchDetail}
                onChange={changeSearchDetail} />
        <button className='btn-2' onClick={searchPost}>Search</button>
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
