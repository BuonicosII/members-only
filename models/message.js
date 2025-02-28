const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true},
    text: { type: String, required: true},
    timeStamp: { type: Date, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true}
})

module.exports = mongoose.model("Message", MessageSchema);