const express = require('express')

const user = require('./routes/user')


//redis connect setting


//mysql connect setting



const app = express()

app.use(express.static('./public'))

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/user",user)

app.listen(3000,()=>{console.log('Server is listening in port 3000')})
