import React from 'react'
import { Link } from 'react-router-dom'
import './VideoStyles.css'

import pic from '../assets/Home_Page.jpg'
import ImageButton from '../assets/image.png'
import Modal from './Modal'



const Video = () => {
    return (
        <div className='hero'>
            <div className='content'>
               <div className= 'image'>
               <img src={pic}/>
               </div>
                <h1>Confess Your Heart Out</h1>
                <p>A page to pour out your inner thoughts.</p>
                </div>

            <div className='form'>
            <form>
                <label>Leave it blank if this is not a reply</label>
                <input type='text' placeholder='Reply Confession Post ID'></input>
                <textarea rows='6' placeholder='Type your confession here' />
                
                <button className='btn'>Picture</button>
                <button onclick= {<Modal/>} className='btn'>Submit</button>
                
                
                
            </form>
            </div>


        </div>
    )
}

export default Video