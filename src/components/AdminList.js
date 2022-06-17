import React, { useState, useEffect } from 'react'
import './Listings.css'
import pic from '../assets/download2.jpg'
import pic2 from '../assets/download.jpg'
import PostService from '../services/PostService'
import Card from './Card'


function AdminList() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        PostService.getPosts().then((res) => {
            setPosts(res.data);
    }, []);
    })

    return(
        <div className="wrapper-grid">
            {
                posts.map(post => (
                    <Card key={post.submitId} img={pic} id={"HeartOut" + post.id} date={post.datePosted} description={post.content} role="admin" />
                ))
                
            }
        </div>
    )
        
}

export default AdminList