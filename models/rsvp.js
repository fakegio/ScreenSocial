const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    user:{type: Schema.Types.ObjectId, required:[true, 'user is required'], ref:'User'},
    event:{type: Schema.Types.ObjectId,  required:[true, 'event is required'], ref:'Event'},
    title: {type: String},
    status:{type: String, required:[true, 'status is required'],  enum:['YES','NO','MAYBE']}
});

module.exports = mongoose.model('RSVP', rsvpSchema);