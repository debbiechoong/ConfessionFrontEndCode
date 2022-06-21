import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchPage from '../components/SearchPage' 
import Header from '../components/Header'


export default function Search() {
  return (
    <div>
       <Navbar/>
       <Header heading='Search Panel' adminList='Search your way out.'/>
        <SearchPage/>
        <Footer/>
        
    </div>
  )
}