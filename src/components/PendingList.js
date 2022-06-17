import React, { useEffect, useState } from 'react'
import './Listings.css'
import pic from '../assets/download2.jpg'
import PostService from '../services/PostService'
import Card from './Card'


function PendingList() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        PostService.getPendingPosts().then((res) => {
            setPosts(res.data);
    }, []);
    })
    
    return(
        <div className="wrapper-grid">
            {
                posts.map(post => (
                    <Card key={post.submitId} img={pic} id={"HeartOut#"} date={post.datePosted} description={post.content} submitId={post.submitId} role="pending" />
                ))
                
            }
        </div>
    )

}

export default PendingList