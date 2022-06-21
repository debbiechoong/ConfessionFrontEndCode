import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';
import PostService from '../services/PostService';
import { SubmitButton, UploadButton } from './Buttons'
import FileService from '../services/FileService';
import Modal from './Modal';

const Form = () => {

    const navigate = useNavigate();

    const [replyId, setReplyId] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [preview, setPreview] = useState();

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        if (!image) {
            setPreview(undefined);
            return;
        }
    
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);
    
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
      }, [image]);

    const toggleThankyou = () => {
        setIsModal(!isModal);
    }

    function changeImage(e) {
        if (!e.target.files || e.target.files.length === 0) {
          console.log("Problem")
          setImage(undefined);
          return;
      }
        setImage(e.target.files[0]);
      }

    // Change content while user is inputing
    const changeContent = (e) => {
        setContent(e.target.value);
    } 
    
    // Change replyId when user is inputing 
    const changeReplyId = (e) => {
        setReplyId(e.target.value)
    }


    function uploadImage(e) {

        console.log(e);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'darwin');

        console.log(data);
    
        FileService.uploadFile(data).then(res => {
            const file = res.json();
            console.log(file);
        }); 
     
    }


    function submitPost(e) {

        // Get submitId everytime user create a post
        let submitId;
        PostService.getSubmitId().then(res => {

            toggleThankyou();

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
                <input type='text' placeholder='Reply Confession Post ID (Leave blank if not a reply)' value={replyId} onChange={changeReplyId}></input>
                <textarea rows='6' placeholder='Type your confession here' value={content} onChange={changeContent} />
                {/*<CustomButton onClick={submitPost} />*/}
                <UploadButton />
                {/* submit button */}
                <input 
                    type="button"
                    value="Submit"
                    onClick={uploadImage}
                />
                            
                {isModal && <Modal id='design'
                    content={<>
                    <b className='title'>Confession Submitted</b>
                    <h4 id='content' color='black'>Thank You for uploading your confession. You confession will be uploaded soon.</h4>
                    <button className='closebtn' onClick={toggleThankyou}> X </button>
                    </>}      
                />}
            </form>
        </div>
    )
}

export default Form