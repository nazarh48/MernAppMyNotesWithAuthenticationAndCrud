const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors') //for solving cors

connectToMongo();
const app = express();
app.use(cors()) //for solving cors
const port = 5000;
app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, ()=>{
    console.log(`app is listening on http://localhost:${port}`)
})

