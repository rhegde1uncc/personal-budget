const mongoose = require("mongoose");
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)
 const budgetSchema = new mongoose.Schema({
     title : {
         type: String,
         required: true,
         trim: true,
         unique: true
     },
     budget : {
         type: Number,
         required: true
     },
     d3_color : {
         type: String,
         required: true,
         unique: true,
         validate: [colorValidator, 'Invalid color']
     },
     ch_color : {
        type: String,
        required: true,
        unique: true,
        validate: [colorValidator, 'Invalid color']
    }
 }, {collection: 'my_budget'})

 module.exports = mongoose.model('my_budget', budgetSchema)