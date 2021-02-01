const mongoose = require('mongoose');
const conURL = process.env.DB_HOST

mongoose.connect(conURL, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log("CONNECTION ESTABLISH")
}).catch((e)=> {
    console.log("ERROR CONNECTING DATABASE", e)
})