const mongoose = require("mongoose");

const hawkersSchema = mongoose.Schema({
    Name: {type: String, required: true, trim: true},
    Image: [ String ],
    AddressLine1: {type: String, required: true, trim: true},
    AddressLine2: {type: String, trim: true},
    Postcode: {type: Number, required: true, min:0},
    OpeningTime: {type: Number, required: true, min:0},
    ClosingTime: {type: Number, required: true, min:0},
    AmIOpen: Boolean,
    owner: {type: mongoose.Schema.Types.ObjectId, ref:"Users"},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"Users"}]
})

const Hawkers = mongoose.model("Hawkers", hawkersSchema);

module.exports = Hawkers;