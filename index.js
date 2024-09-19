const express = require('express');
const cors = require("cors");

const Product = require("./db/Product")

// const mongoose = require('mongoose');
// const app = express();
// const connectDB= async () =>{
// mongoose.connect('mongodb://localhost:27017/e-comm');
// const productSchema = new mongoose.Schema({});
// const product= mongoose.model('product',productSchema);
// const data = await product.find();
// console.warn(data);
// }
// connectDB();

require('./db/config');
const User = require("./db/User");
const app = express();

app.use(express.json());
app.use(cors());


app.post("/register", async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result);
})


app.post("/login", async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        }
        else {
            resp.send({ result: "No user found" })
        }
    }
    else {
        resp.send({ result: "No user found" })
    }
})


app.post('/add-product', async (req, resp)=>{
        let product = new Product(req.body);
        let result = await product.save();
        resp.send(result);
})
app.listen(5000);
