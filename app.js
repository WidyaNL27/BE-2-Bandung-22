const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.json({
        message : 'OK'
    })
    res.end('OK')
})

app.use('/menu', router)

app.use((err, req, res, next) =>{
    const status = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(status).json({
        message: err.message
    })
})

app.listen(port, '0.0.0.0', ()=> {
    console.log(`app is running on port ${port}`)
})
