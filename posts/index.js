const express = require('express')
const cors = require('cors')
const {randomBytes} = require('crypto');
const axios = require('axios')
const app = express();
app.use(cors())
app.use(express.json())

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    }

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated', data: {
            id, title
        }
    }).catch(err => console.log(err))

    res.status(201).send(posts[id])
})


app.post('/events', (req, res) => {
    const {type} = req.body;
    console.log(`Event received ${type}`);
    res.send({})
})


const port = 4000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})