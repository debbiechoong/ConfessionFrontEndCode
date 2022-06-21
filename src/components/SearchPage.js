import React, { useState, useEffect } from 'react'
import './Listings.css'
import pic from '../assets/download2.jpg'
import PostService from '../services/PostService'
import Card from './Card'
import './SearchPage.css'


function SearchPage() {

    const [relatedPosts, setRelatedPosts] = useState([]);
    const [searchDetail, setSearchDetail] = useState('');

    const changeSearchDetail = (e) => {
        setSearchDetail(e.target.value);
    }

    const searchPost = (e) => {
        e.preventDefault();
        setRelatedPosts([]);
        let formattedSearchDetail = searchDetail;
        if (searchDetail.startsWith('#')) {
            formattedSearchDetail = formattedSearchDetail.replace('#', '');
        }
        PostService.searchPosts(formattedSearchDetail).then(res => {
            setRelatedPosts(res.data);
        });
      }
    
    return(
        <>
        <div className="wrap">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="Keyword, date (yyyy-mm-dd) or post id (#id)" value={searchDetail}
                onChange={changeSearchDetail} />
                    <button type="submit" className="searchButton" onClick={searchPost}>
                <i className="fa fa-search"></i>
            </button>
            </div>
        </div>
           
            <div className="wrapper-grid">
                {
                    relatedPosts.map(post => (
                        <Card key={post.submitId} img={pic} id={"HeartOut" + post.id} date={post.datePosted} description={post.content} replyId={post.replyId} role="confession" />
                    ))    
                }
            </div>
        </>
    )
}

export default SearchPage
