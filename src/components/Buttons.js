import React, { useState, useRef, useEffect } from 'react'
import './Buttons.css'
import Modal from './Modal';
import Popup from './Popup';
import pic from '../assets/download2.jpg'
import FileService from '../services/FileService';

export default function Buttons() {

  return (
     <button className="custom-btn btn-submit"><span>Click!</span><span>Read More</span></button>
  )
}

export function UploadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState('');
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


  function changeImage(e) {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("Problem")
      setImage(undefined);
      return;
  }
    setImage(e.target.files[0]);
  }

  function handleFileInput(e) {
    hiddenFileInput.current.click();
  }

  const uploadImage = async e => {

    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'darwin');

    FileService.uploadFile(data).then(res => {
        const file = res.json();
        setImage(file.secure_url);
    }); 
 
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
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
        </>}
      />}
    </>
    
  )
}

export function SubmitButton(props) {

  const [isModal, setIsModal] = useState(false);

  const toggleThankyou = () => {
    setIsModal(!isModal);
  }


  return (
    <>
      {/* submit button */}
      <input 
        type="button"
        value="Submit"
        onClick={toggleThankyou}
      />
                
      {isModal && <Modal id='design'
         content={<>
         <b className='title'>Confession Submitted</b>
         <h4 id='content' color='black'>Thank You for uploading your confession. You confession will be uploaded soon.</h4>
         <button className='closebtn' onClick={() => {
          props.submitClick();
          toggleThankyou();}}> X </button>
         </>}      
      />}
    </>
  )

}

