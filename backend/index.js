const express = require('express')
const app = express()
const port = 5000
const mainRoute=require('./mainRoute/mainRoute')
const cors=require('cors')
const dotevn=require('dotenv')
const { ConnectDB } = require('./config/db')
const path = require('path')
dotevn.config()
app.use(express.json())
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors(
    {
        origin:"*"
    }
))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
ConnectDB()
app.use('/api',mainRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
