const express = require('express');
const bodyParser = require("body-parser");
const userRoutes = require('./routes/UserRoutes')
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");

// const conversationRoute = require("./routes/conversations");
// const messageRoute = require("./routes/messages");

const app = express();
app.use(fileupload());
app.use(bodyParser.json());
console.log(app)
app.use('/images', express.static("files"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth_token');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS,PUT');
    next()
})
app.get('/', (req, res) => {
    try {
        res.send("chalgya mja aa gya")
    } catch (error) {
        console.log(error)
    }
});
app.use('/api', userRoutes)

// app.use("/api/conversations", conversationRoute);
// app.use("/api/messages", messageRoute);
// app.listen(5000, () =>{console.log("opop")})


try {
    app.listen(5000, () => {
        mongoose
            .connect("mongodb+srv://BTP_improve:BTP_improve@cluster0.g2tn7.mongodb.net/BTP_database?retryWrites=true&w=majority", {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })
            .then(console.log(`cononected to ${5000}`))
            .catch((err) => console.log(err));
    })
    
} catch (error) {
    console.log(error)
}