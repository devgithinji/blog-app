const express = require('express')
const cors = require('cors')
const axios = require('axios')
const {randomBytes} = require('crypto');
const {raw} = require("express");
const app = express();
app.use(cors())
app.use(express.json())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const {id: postId} = req.params;
    const comments = commentsByPostId[postId] || [];
    res.send(comments);
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const {id: postId} = req.params;
    const comments = commentsByPostId[postId] || [];
    comments.push({id: commentId, content, status: 'pending'})

    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId,
            status: 'pending'
        }
    })

    res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    if (type === 'CommentModerated') {
        const {postId, id, status, content} = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => comment.id === id)

        comment.status = status;


        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id, status, postId, content
            }
        })
    }
    res.send({})
})


const port = 4001;

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})