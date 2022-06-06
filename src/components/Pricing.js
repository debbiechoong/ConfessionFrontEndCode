import React from 'react'
import {Link} from 'react-router-dom'
import './PricingStyles.css'
import image from '../assets/header.png';

const Pricing = () => {
    return (
        <div className='pricing'>
            <div className='card-container'>
                
                <div className='card'>
                    <img src={image} height={200} width={400} />
                    <h3>- Basic -</h3>
                    <span className='bar'></span>
                    <p className='btc'>1 BTC</p>
                    <p>- 3 Days qweqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdsdfs</p>
                    <p>- Views -</p>
                    <p>- Featured -</p>
                    <p>- Private Quarters -</p>
                    <Link to='/contact' className='btn'>Book</Link>
                </div>
                <div className='card'>
                    <img src={image} height={200} width={400} />
                    <h3>- Suite -</h3>
                    <span className='bar'></span>
                    <p className='btc'>1 BTC</p>
                    <p>- 3 Days -</p>
                    <p>- Views -</p>
                    <p>- Featured -</p>
                    <p>- Private Quarters -</p>
                    <Link to='/contact' className='btn'>Book</Link>
                </div>
            </div>
        </div>
    )
}

export default Pricing