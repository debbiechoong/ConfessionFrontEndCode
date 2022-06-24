import React, {useState, useRef, useEffect} from 'react';
import './FormStyles.css';
import PostService from '../services/PostService';
import pic from '../assets/img2.jpg'
import FileService from '../services/FileService';
import Modal from './Modal';
import Popup from './Popup';

const moment = require('moment');

const Form = () => {

    // Posts related
    const [replyId, setReplyId] = useState("");
    const [content, setContent] = useState("");

    // File related
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [preview, setPreview] = useState();

    // Pop up windows
    const [isModal, setIsModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("Something went wrong!");

    const hiddenFileInput = useRef(null);


    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
    
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
      }, [selectedFile]);


    function handleFileInput(e) {
        hiddenFileInput.current.click();
    }

    function toggleThankyou(msg) {
        if (!isModal) {
            setMessage(msg);
        } else {
            setContent("");
            setReplyId("");
        }
        setIsModal(!isModal);
    }

    function togglePopup() {
        setIsOpen(!isOpen);
    }


    function changeImage(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
          return;
      }
      setSelectedFile(e.target.files[0]);
      }

    
    // Change content while user is inputing
    const changeContent = (e) => {
        setContent(e.target.value);
    } 

    
    // Change replyId when user is inputing 
    const changeReplyId = (e) => {
        setReplyId(e.target.value)
    }


    // Submit post & files
    function submitPost(e) {

        // Get submitId everytime user create a post
        let submitId;
        PostService.getSubmitId().then(res => {

            // Retrive the submit Id
            submitId = res.data;
            
            // Set reply id
            let realReplyId;
            if (replyId === "" || replyId === null) {
                realReplyId = -1
            }else{
                realReplyId = replyId;
            }

            // Convert from javscript date to mysql date format
            // const newDate = new Date().toLocaleString().slice(0, 19).replace('/', '-').replace('/', '-').replace(', ', ' ');
            // const newDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const newDate = new Date().getTime();
            console.log(newDate);
            const hasFile = selectedFile ? 1 : 0;

            // Create new post object
            let newPost = {
                submitId: submitId,
                content: content,
                datePosted: newDate,
                replyId: realReplyId,
                hasFile: hasFile
            };

            console.log(newPost);
            return newPost;
        }).then(newPost => {
            // Call the submitPost api 
            PostService.submitPost(newPost).then(res => {
                
                if (newPost.hasFile === 1) {
                    const data = new FormData();
                    data.append('file', selectedFile);
                
                    FileService.uploadFile(data, submitId).then(res => {
    
                    }); 
                } 
                toggleThankyou("Thank you for your submission. Your post may or may not be posted.");         
            }).catch(err => {
                toggleThankyou("Something went wrong!");
            });
        });

    }

    return (
        <div className='form'>
            <form>
                <input type='text' placeholder='Reply Confession Post ID (Leave blank if not a reply)' value={replyId} onChange={changeReplyId}></input>
                <textarea rows='6' placeholder='Type your confession here' value={content} onChange={changeContent} required/>
                
                {/* upload picture button */}
                <input className='popup'
                type="button"
                value="Upload Picture"
                onClick={togglePopup}
                />

                {isOpen && <Popup id='design'
                    content={<>
                    <b className='title'>Upload Picture</b>
                    <img src={preview ? preview : pic} className="preview" alt="" />
                    <input style={{display: "none"}}
                            type="file"
                            onChange={changeImage}
                            ref={hiddenFileInput}/>
                    <button className='picbtn' onClick={handleFileInput} type="button">Upload</button>
                    <button className='closebtn' onClick={togglePopup}> X </button>
                    <button className='ccnbtn' onClick={togglePopup} type="button">Confirm</button>
                    </>}
                />}


                {/* submit button */}
                <input 
                    type="button"
                    value="Submit"
                    onClick={submitPost}
                />
                            
                {isModal && <Modal id='design'
                    content={<>
                    <b className='title'>Confession Status</b>
                    <h4 id='content' color='black'>
                        {
                            message
                        }
                    </h4>
                    <button className='closebtn' onClick={toggleThankyou}> X </button>
                    </>}      
                />}
            </form>
        </div>
    )
}

export default Form