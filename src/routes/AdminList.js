import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Header from '../components/Header'
import AdminList from '../components/AdminList'


export default function AdminL() {
  return (
    <div>
       <Navbar/>
       
       <Header heading='Admin Panel' adminPendingList="Click to Pending List"/>
        <AdminList />
        <Footer/>
        
    </div>
  )
}
