import {useState} from "react";
import axios from "axios";
import {commentUrl} from "../urls";

const CommentCreate = ({postId}) => {
    const [content, setContent] = useState('')

    const createContent = async (e) => {
        e.preventDefault();
        const {data} = await axios.post(commentUrl(postId), {content})
        setContent('')
    }

    return (
        <div>
            <form onSubmit={createContent}>
                <div className='form-group'>
                    <label>New content</label>
                    <input type="text" className='form-control' value={content}
                           onChange={(e) => setContent(e.target.value)}/>
                </div>
                <button className="btn btn-primary">submit</button>
            </form>
        </div>
    )
}

export default CommentCreate;