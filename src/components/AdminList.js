import React, { Component } from 'react'
import './AdminList.css'
import pic from '../assets/download2.jpg'
import pic2 from '../assets/download.jpg'


class AdminList extends Component {
    render() {
        return(
            
                <div className="wrapper-grid">
                <Card img={pic} id="HeartOut002" date="2012 07 2989" description="I love my live, I am happy, I do not need people to validate my feelings "/>

                <Card img={pic2} id="HeartOut002" date="2012 07 2989" 
                description="Hi there! My name is Anna and I am a book lover, traveler and professional blogger. Follow me to stay connected! Hi there! My name is Anna and I am a book lover, traveler and professional blogger. Follow me to stay connected!
                Hi there! My name is Anna and I am a book lover, traveler and professional blogger. Follow me to stay connected! Hi there! My name is Anna and I am a book lover, traveler and professional blogger. Follow me to stay connected!
                Hi there! My name is Anna and I am a book lover, traveler and professional blogger. Follow me to stay connected! Hi there! My name is Anna and I am a book lover, traveler and professional blogger. Follow me to stay connected!"/>
                <Card img={pic} id="HeartOut002" date="2012 07 2989" description="I love my live, I am happy, I do not need people to validate my feelings "/>
            </div>
         )
        }
}




function Card(props){
    return(
        
                    <div className="container">
                        
                    <img className= "image" src={props.img}/>
                            <h1 className="name">{props.id}</h1>
                            <h2 className="date">{props.date}</h2>
                            <p className="description">{props.description}</p> 
                            <button className='btn2'>Remove Batch</button>
                            <button className='btn3'>Delete</button>
                            
                             
                    </div>

        


    )
}

export default AdminList