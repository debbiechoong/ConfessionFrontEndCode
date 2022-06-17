import React from 'react'
import './VideoStyles.css'
import pic from '../assets/Home_Page.jpg'
import Form from './Form';

function Video() {


    return (
        <div className='hero'>
            <div className='content'>
               <div className= 'image'>
               <img src={pic} alt="" />
               </div>
                <h1>Confess Your Heart Out</h1>
                <p>A page to pour out your inner thoughts.</p>
            </div>
            <Form />
        </div>
    )
}

export default Video