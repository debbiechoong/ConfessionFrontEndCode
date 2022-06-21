import React, { useEffect, useState } from 'react'
import './Listings.css'
import pic from '../assets/download2.jpg'
import PostService from '../services/PostService'
import Card from './Card'
import FileService from '../services/FileService'


function PendingList() {

    const [posts, setPosts] = useState([]);
    const [fileInfos, setFileInfos] = useState([]);

    useEffect(() => {
        PostService.getPendingPosts().then(res => {
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
                    //console.log(post);
                    // console.log(fileInfos[index]);
                    if (post.hasFile === 1 && fileInfos[index] !== undefined) { 
                        return (
                            <Card key={post.submitId} file={fileInfos[index]} 
                                    id={"HeartOut#"} date={post.datePosted} 
                                    description={post.content} role="admin" 
                                    replyId={post.replyId}/>
                        )
                    }

                    return (
                        <Card key={post.submitId} img={pic} 
                                id={"HeartOut#"} date={post.datePosted} 
                                description={post.content} role="admin" 
                                replyId={post.replyId}/>
                    )
                }
                )
                
            }
        </div>
    )

}

export default PendingList