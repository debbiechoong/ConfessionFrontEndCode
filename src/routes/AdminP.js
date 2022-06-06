import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Header from '../components/Header'
import PendingList from '../components/PendingList'


export default function AdminP() {
  return (
    <div>
       <Navbar/>
       
       <Header heading='Admin Panel' adminList='Click to Confession List'/>
        <PendingList/>
        <Footer/>
        
    </div>
  )
}
