const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


const AdminDetails = mongoose.model("AdminDetails", AdminSchema);
module.exports = AdminDetails;