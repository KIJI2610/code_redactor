const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.text())
app.use(cors())

function runing(code) {
    try {
        const result = new Function(`${code}`)
        return result()
    } catch (error) {
        return `Error: ${error.message}`
    }
}

const a = 12
app.get('/', (req, res) => {
    res.send('Server run')
})

app.post('/run', (req, res) => {
    const code = req.body
    const result = runing(code)
    res.send(result)

})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})