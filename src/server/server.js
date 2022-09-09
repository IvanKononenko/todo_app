const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 3001

//connect to mongoose
mongoose.connect("mongodb+srv://admin:needweed@cluster0.nsilq.mongodb.net/tasksDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
// mongoose.connection.on('connected',()=>{
//     console.log('Connected to database.')
// })

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use("/", require("./routes/taskRoute"))


app.listen(PORT, () => console.log(`Express server running on port ${PORT}`))