import React, { Component } from 'react'
import './HeaderStyle.css'
import { Link } from 'react-router-dom'
import pic from '../assets/download2.jpg'


class Header extends Component {
    render() {
        return (
            <div className='hero-img'>
                
                <div className='heading'>
                    <h1>{this.props.heading}</h1>
                    <p>{this.props.text}</p>
                    
                    <Link to='/adminList' >{this.props.adminList}</Link>
                    <Link to='/adminPendingList' >{this.props.adminPendingList}</Link>
                </div>
            </div>
        )
    }
}

export default Header
