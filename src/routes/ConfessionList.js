import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Header from '../components/Header'
import Confess from '../components/Confession'


export default function ConfessionList() {
  return (
    <div>
       <Navbar/>
       
       <Header heading='Confession' text='Safe space to express your thoughts. '/>
        <Confess/>
        <Footer/>
        
    </div>
  )
}
