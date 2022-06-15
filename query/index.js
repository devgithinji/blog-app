const express = require('express')
const cors = require('cors')
const axios = require("axios");
const app = express();
app.use(cors())
app.use(express.json())

const posts = {};

const handleEvent = ({data, type}) => {
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }


    if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id, content, status})
    }

    if (type === 'CommentUpdated') {
        const {postId, status, id, content} = data
        const comment = posts[postId].comments.find(comment => comment.id === id)
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
})


app.post('/events', (req, res) => {
    const {type, data} = req.body;
    handleEvent({type, data})
    console.log(posts)

    res.send({})

})


const port = 4002;

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
    const {data} = await axios.get('http://localhost:4005/events');

    for (let event of data) {
        console.log('Processing event:', event.type)
        handleEvent({...event})
    }
})