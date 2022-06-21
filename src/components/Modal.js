import React from "react";
import './Modal.css'

 
const Modal = props => {
  return (
    <div className="popup-box">
      <div className="box">
        
       {props.content}
        
      </div>
    </div>
  );
};
 
export default Modal;