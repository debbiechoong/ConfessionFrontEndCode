import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Header from '../components/Header'
import Admin_List from '../components/AdminList'


export default function AdminList() {
  return (
    <div>
       <Navbar/>
       
       <Header heading='Admin Panel' adminPendingList="Click to Pending List"/>
        <Admin_List/>
        <Footer/>
        
    </div>
  )
}
