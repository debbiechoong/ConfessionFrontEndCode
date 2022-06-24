import './Card.css'
import PostService from '../services/PostService'

function Card(props){

    function populateButton() {
        const role = props.role;
        if (role === "admin") {
            return (
                <>
                    <button className='btn3' onClick={deletePost}>Delete</button>
                    <button className='btn2' onClick={removeBatch}>Remove Batch</button> 
                </>
            )
        } else if (role === "pending") {
            return (
                <>
                    <button className='btn3' onClick={publishPost}>Publish</button> 
                </>
            )
        } 
    }

    function deletePost (e) {
        e.preventDefault();
        const id = parseInt(props.id.substring(8));
        PostService.deletePost(id).then(res => {
            //console.log(res);
        });
    }

    function removeBatch() {   
        const id = parseInt(props.id.substring(8));
        PostService.removeBatch(id).then(res => {  
        })
    }


    function publishPost(e) {

        e.preventDefault();
        PostService.publishPost(props.submitId).then(res => {
            console.log(res);
            window.location.reload(true);
        });
    }

    return(
        
        <div className="container">
            {
                props.file ? <img className= "image" src={`data:image/jpeg;base64,${props.file}`} alt="" />
                : <img className= "image" src={props.img} alt="" />
            }
             
            <h1 className="name">{props.id}</h1>
            <h2 className="date">{props.date}</h2>
            {
                props.replyId !== -1 ? 
                
               
               <><p className="description">{props.description} </p> <p className='replyid'>#Reply to HeartOut{props.replyId}</p></> 

                : <p className="description">{props.description}</p>
            }
            {
                populateButton()
            }   
        </div>
    )
}

export default Card