import express from "express"
import cookieParser from "cookie-parser"

const app = express()

// console.info(app)
app.listen(5000, ()=>{
    console.info(`App is running in localhost:5000`)
})
// to read cookies
app.use(cookieParser())
// to read json from body
app.use(express.json())
// get
app.get('/', (req, res) =>{
    res.format({
        JSON : () => {

            res.send({
                message: "yo!"
            })
        }
    })
})

app.get('/contact', (req, res) =>{
    // res.send('<p>Response received from Contact page</p>.')
    res.status(200).format({
        json: () => {
            res.send({
                ip: req.ip,
                query: req.query,
                body: req.body,
                path: req.path,
                params: req.params
            })
        }
    })
})

app.get('/blogs', (req, res) =>{
    res.send('<p>Response received from Blogs page</p>.')
})

app.get('/projects', (req, res) =>{
    res.status(200).json({
        cookies: req.cookies
    })
    // res.send('<p>Response received from Projects page</p>.')
})

app.get('/about', (req, res) =>{
    res.cookie("token", "askdjbajfdlajsda")
    res.send('cookie sent')
})
// post
app.post('/contact/:id', (req, res) =>{
    res.status(200).format({
        json: () => {
            res.send({
                ip: req.ip,
                query: req.query,
                body: req.body,
                path: req.path,
                params: req.params
            })
        }
    })})

app.post('/blogs/:id', (req, res) =>{
    res.send('<p>Post created for or from Blogs page</p>.')
})
app.post('/projects/:id', (req, res) =>{
    res.send('<p>Post created for or from Projects page</p>.')
})
// put
app.put('/contacts', (req, res) =>{
    res.send('<p>Put from Contacts page</p>.')
})
app.put('/blogs', (req, res) =>{
    res.send('<p>Put from Blogs page</p>.')
})
app.put('/projects', (req, res) =>{
    res.send('<p>Put from Projects page</p>.')
})
// patch
app.patch('/contacts', (req, res) =>{
    res.send('<p>Patch from Contacts page</p>.')
})
app.patch('/blogs', (req, res) =>{
    res.send('<p>Patch from Blogs page</p>.')
})
app.patch('/projects', (req, res) =>{
    res.send('<p>Patch from Projects page</p>.')
})
// delete
app.delete('/contacts', (req, res) =>{
    res.send('<p>Delete from Contacts page</p>.')
})
app.delete('/blogs', (req, res) =>{
    res.send('<p>Delete from Blogs page</p>.')
})
app.delete('/projects', (req, res) =>{
    res.send('<p>Delete from Projects page</p>.')
})