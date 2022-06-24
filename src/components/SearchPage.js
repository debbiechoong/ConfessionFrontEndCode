import React, { useState, useEffect } from 'react'
import './Listings.css'
import pic from '../assets/download2.jpg'
import PostService from '../services/PostService'
import Card from './Card'
import './SearchPage.css'
import FileService from '../services/FileService'
const moment = require('moment');


function SearchPage() {

    const [relatedPosts, setRelatedPosts] = useState([]);
    const [searchDetail, setSearchDetail] = useState('');
    const [fileInfos, setFileInfos] = useState([]);

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
            var data = res.data;
            setRelatedPosts(res.data);
            return data;
        }).then(postData => {
            var submitIds = postData.map((post) => (post.hasFile === 1 ? post.submitId : null));
            // console.log(submitIds);
            var submitIdsNumbers = submitIds.filter(Number);
            return {
                submitIds: submitIdsNumbers,
                postData: postData
            };
        }).then(data => {

            FileService.getFilesBySubmitIds(data).then(res => {
                console.log(res)
                var fileData = [...res.data];
                var newFiles = [];
                var fileIndex = 0;
                for (var i=0; i < data.postData.length; i++) {
                    if (data.postData[i].hasFile === 1) {
                        newFiles.push(fileData[fileIndex].data);
                    }else {
                        newFiles.push(null);
                    }
                    fileIndex += 1;
                }
                setFileInfos(newFiles);
                return newFiles;
            });
        });
      }
    
    return(
        <>
        <div className="wrap">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="Keyword, date (yyyy-mm-dd) or post id (#id)" value={searchDetail}
                onChange={changeSearchDetail} />
                    <button type="submit" className="searchButton" onClick={searchPost}>Q
                
            </button>
            </div>
        </div>
           
            <div className="wrapper-grid">
                {
                    relatedPosts.reverse().map((post, index) => {
                        var yearDay = post.datePosted.toString().slice(8, 12);
                        var year = post.datePosted.toString().slice(0, 4);
                        const hour = (parseInt(post.datePosted.toString().slice(12, 14)) + 8) % 24;
                        const displayDate = new Date(parseInt(year), 0, parseInt(yearDay));
                        const displayDateTime = moment(displayDate).format('YYYY-MM-DD') + " " + hour + post.datePosted.toString().slice(14);
                        if (post.hasFile === 1 && fileInfos[relatedPosts.length - 1 -index] !== undefined) { 
                            return (
                                    <Card key={post.submitId} file={fileInfos[relatedPosts.length - index - 1]} 
                                        id={"HeartOut" + post.submitId} date={displayDateTime} 
                                        description={post.content} role="search" submitId={post.submitId}
                                        replyId={post.replyId} />
                            )
                        }
    
                        return (
                                <Card key={post.submitId} img={pic} 
                                        id={"HeartOut" + post.submitId} date={displayDateTime} 
                                        description={post.content} role="search" submitId={post.submitId}
                                        replyId={post.replyId}/>
                        )
                    })    
                }
            </div>
        </>
    )
}

export default SearchPage
