import React from 'react'
import './FormStyles.css'

const Form = () => {
    return (
        <div className='form'>
            <form>
                <label>Leave it blank if this is not a reply</label>
                <input type='text' placeholder='Reply Confession Post ID'></input>
                <textarea rows='6' placeholder='Type your confession here' />
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default Form