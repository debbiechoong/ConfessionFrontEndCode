import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';
import PostService from '../services/PostService';

const Form = () => {

    const navigate = useNavigate();

    const [replyId, setReplyId] = useState("");
    const [content, setContent] = useState("");

    // Change content while user is inputing
    const changeContent = (e) => {
        setContent(e.target.value);
    } 
    
    // Change replyId when user is inputing 
    const changeReplyId = (e) => {
        setReplyId(e.target.value)
    }


    function submitPost(e) {

        e.preventDefault();

        // Get submitId everytime user create a post
        let submitId;
        PostService.getSubmitId().then(res => {

            // Retrive the submit Id
            submitId = res.data;
            
            // Set reply id
            let realReplyId;
            if (replyId === "") {
                realReplyId = -1
            }else{
                realReplyId = replyId;
            }
            // Convert from javscript date to mysql date format
            let newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

            // Create new post object
            let newPost = {
                submitId: submitId,
                content: content,
                datePosted: newDate,
                replyId: realReplyId
            };

            console.log(newPost);

            // Call the submitPost api 
            PostService.submitPost(newPost).then(res => {
                // Activate pop up message
                document.body.classList.add('active-modal');

                // Navigate to confession list page
                navigate('/confession');
            });
        });
    }

    return (
        <div className='form'>
            <form>
                <label>Leave it blank if this is not a reply</label>
                <input type='text' placeholder='Reply Confession Post ID' value={replyId} onChange={changeReplyId}></input>
                <textarea rows='6' placeholder='Type your confession here' value={content} onChange={changeContent} />
                <button className='btn' onClick={submitPost}>Submit</button>
            </form>
        </div>
    )
}

export default Form