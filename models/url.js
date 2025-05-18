const mongoose = require("mongoose");
const UrlSchema = new mongoose.Schema({
    shortId : {
        type : String,
        require : true,
        unique : true,
    },
    redirectUrl:{
        type: String,
        require: true,
    },
    visitHistory : [{timestamp: { type: Number}}]
}, {timestamps: true})
const url = mongoose.model("url",UrlSchema)

module.exports = url;