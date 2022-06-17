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
        } else if (role === "confession") {
            return (
                <>
                    <button className='btn2'>Reply</button>
                    <button className='btn3'>Read more</button> 
                </>
            )
        }
    }

    function deletePost (e) {
        e.preventDefault();
        const id = parseInt(props.id.substring(8));
        PostService.deletePost(id).then(res => {
            console.log(res);
        });
    }

    function removeBatch() {   
        const id = parseInt(props.id.substring(8));
        PostService.removeBatch(id).then(res => {  
            window.location.reload(true);  
        })
    }

    function publishPost(e) {
        e.preventDefault();
        /*
        let newPost = {
            content: props.description,
            datePosted: props.date,
            replyId: props.replyId,
        };
        console.log(newPost);
        */
        PostService.publishPost(props.submitId).then(res => {
            console.log(res);
        });
    }

    return(
        
        <div className="container">
            
        <img className= "image" src={props.img} alt="" />
                <h1 className="name">{props.id}</h1>
                <h2 className="date">{props.date}</h2>
                <p className="description">{props.description}</p> 
                {
                    populateButton()
                }
        </div>
    )
}

export default Card