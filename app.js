import express from "express"
const app = express()

// console.info(app)

app.listen(5000, ()=>{
    console.info(`App is running in localhost:5000`)
})
// get
app.get('/', (req, res) =>{
    res.format({
        // 'text/plain': function () {

        //     res.send('<i>Response received from Homepage</i>.')
        // }
        /*
            'application/json: function () {
                res.send({
                    message: "yo!"
                })
            }
        */
        JSON : function () {

            res.send({
                message: "yo!"
            })
        }
    })
})

app.get('/contact', (req, res) =>{
    res.send('<p>Response received from Contact page</p>.')
})

app.get('/blogs', (req, res) =>{
    res.send('<p>Response received from Blogs page</p>.')
})

app.get('/projects', (req, res) =>{
    res.send('<p>Response received from Projects page</p>.')
})

app.get('/about', (req, res) =>{
    res.send('<p>Response received from About page</p>.')
})
// post
app.post('/contact', (req, res) =>{
    res.send('<p>Contact created for or from Contact page</p>.')
})

app.post('/blogs', (req, res) =>{
    res.send('<p>Post created for or from Blogs page</p>.')
})
app.post('/projects', (req, res) =>{
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