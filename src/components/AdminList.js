import React, { useState, useEffect } from 'react'
import './Listings.css'
import pic from '../assets/download2.jpg'
import PostService from '../services/PostService'
import FileService from '../services/FileService'
import Card from './Card'
const moment = require('moment');



function AdminList() {

    const [posts, setPosts] = useState([]);
    const [fileInfos, setFileInfos] = useState([]);

    useEffect(() => {
        PostService.getPosts().then(res => {
            const data = res.data;
            setPosts(data);
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
            })
            .then(res => {
                //console.log(res);
            })
            .catch(err => {
                console.log("Error ")
            })
        })
        
    }, []);

    return(
        <div className="wrapper-grid">
            {
        
                posts.map((post, index) => {
                    var yearDay = post.datePosted.toString().slice(8, 12);
                    var year = post.datePosted.toString().slice(0, 4);
                    const hour = (parseInt(post.datePosted.toString().slice(12, 14)) + 8) % 24;
                    const displayDate = new Date(parseInt(year), 0, parseInt(yearDay));
                    const displayDateTime = moment(displayDate).format('YYYY-MM-DD') + " " + hour + post.datePosted.toString().slice(14);
                    if (post.hasFile === 1 && fileInfos[index] !== undefined) { 
                        return (
                            <Card key={post.submitId} file={fileInfos[index]} 
                                    id={"HeartOut" + post.id} date={displayDateTime} 
                                    description={post.content} replyId={post.replyId}
                                    role="admin" />
                        )
                    }

                    return (
                        <Card key={post.submitId} img={pic} 
                                id={"HeartOut" + post.id} date={displayDateTime} 
                                description={post.content} replyId={post.replyId}
                                role="admin" />
                    )
                }
                )         
            }
        </div>
    )        
}

export default AdminList