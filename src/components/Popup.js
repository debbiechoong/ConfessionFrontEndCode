import React from "react";
import './Popup.css'

 
const Popup = props => {
  return (
    <div className="popup-box2">
      <div className="box2">
        
        {props.content}
        
      </div>
    </div>
  );
};
 
export default Popup;