const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoogleSchema = new Schema({
    name: String,
    googleID: String,
    email: String
    
    
   
});

const User = mongoose.model('userGoogle', GoogleSchema);
module.exports = User;