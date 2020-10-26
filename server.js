const express = require('express');
const cors = require('cors');

const mongoose = require("mongoose");
const budgetModel = require("./models/budget_schema");
const bodyParser = require('body-parser');

//let budget = require('./budget.json');

const app = express();
const port = 3000;
let url = 'mongodb://localhost:27017/budget_demo';

app.use(cors());
app.use(bodyParser.json());


// app.get('/budget', (req, res) => {
//     res.json(budget);
// });




app.get('/budget', (req, res) => {

    mongoose.connect(url, { useUnifiedTopology: true }, { useNewUrlParser: true })
        .then(() => {
            console.log("fetch: connected to the database");
            // fetch all
            budgetModel.find({})
                .then((data) => {
                    res.json({ "myBudget": data });
                    mongoose.connection.close();
                    console.log("fetch: connection closed");
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })
});


app.post('/budget', (req, res) => {
    //const { username, password} = req.body;
    let newData = new budgetModel({title: req.body.title, budget:req.body.budget, d3_color:req.body.d3_color, ch_color:req.body.ch_color});
    mongoose.connect(url, { useUnifiedTopology: true }, { useNewUrlParser: true })
        .then(() => {
            console.log("insert: connected to the database");
            // Insert
           
            budgetModel.insertMany(newData)
                .then((data) => {
                    console.log(data)
                    mongoose.connection.close();
                    console.log("insert: connection closed");
                    res.send('Inserted');
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

});