import {useState} from "react";
import axios from "axios";
import {postUrl} from "../urls";

const PostCreate = () => {
    const [title, setTitle] = useState('')


    const createPost = async (e) => {
        e.preventDefault();
        const {data} = await axios.post(postUrl, {title});
        setTitle('')
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <div className='form-group'>
                    <label>Title</label>
                    <input type="text" className='form-control' value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <button className="btn btn-primary">submit</button>
            </form>
        </div>
    )
}

export default PostCreate;