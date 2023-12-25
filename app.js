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

app.get('/about', (req, res) =>{
    res.send('<p>Response received from About page</p>.')
})
// post
app.post('/', (req, res) =>{
    res.send('Response received.')
})
// put
app.put('/', (req, res) =>{
    res.send('Response received.')
})
// patch
app.patch('/', (req, res) =>{
    res.send('Response received.')
})
// delete
app.delete('/', (req, res) =>{
    res.send('Response received.')
})