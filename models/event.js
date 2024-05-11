const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    category: {type: String, required:[true, 'category is required'], minLength:[3,'the category should have at least 3 characters.'], enum:['Horror','Comedy','Drama','Action','Other']},
    title: {type: String, required:[true, 'title is required'], minLength:[5,'the title should have at least 5 characters.']},
    host_name: {type: Schema.Types.ObjectId, ref:'User'},
    start_date: {type: Date, required:[true, 'start date is required']},
    end_date: {type: Date, required:[true, 'end date is required']},
    location: {type: String, required:[true, 'location is required'], minLength:[5,'the location should have at least 5 characters.']},
    details: {type: String, required:[true, 'details are required'], minLength:[5,'the content should have at least 5 characters.']},
    image: {type: String, required:[true, 'image file path is required']},
},
{timestamps:true});

//Collection name = events
module.exports = mongoose.model('Event', eventSchema);



// const events = [
//     {
//         id: '1',
//         category: 'Horror',
//         title:'The Exorcist',
//         host_name:'Gio',
//         start_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         end_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         location:'Woodward lounge',
//         details:'A showing of The Exorcist on Halloween night!',
//         image:'exorcist.jpg'
//     },
//     {
//         id: '2',
//         category: 'Horror',
//         title:'The Conjuring',
//         host_name:'Gio',
//         start_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         end_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         location:'Student union',
//         details:'A showing of The Conjuring on Halloween night!',
//         image:'conjuring.png'
//     },
//     {
//         id: '3',
//         category: 'Horror',
//         title:'The Ring',
//         host_name:'Gio',
//         start_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         end_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         location:'Friday lounge',
//         details:'A showing of The Ring on Halloween night!',
//         image:'ring.jpg'
//     },
//     {
//         id: '4',
//         category: 'Comedy',
//         title:'Superbad',
//         host_name:'Gio',
//         start_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         end_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         location:'Woodward lounge',
//         details:'A showing of Superbad',
//         image:'Superbad.jpeg'
//     },
//     {
//         id: '5',
//         category: 'Comedy',
//         title:'Napolean Dynamite',
//         host_name:'Gio',
//         start_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         end_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         location:'Woodward lounge',
//         details:'A showing of Napolean Dynamite',
//         image:'napolean.jpg'
//     },
//     {
//         id: '6',
//         category: 'Comedy',
//         title:'The Hangover',
//         host_name:'Gio',
//         start_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         end_date: DateTime.local().toFormat('yyyy-MM-dd\'T\'HH:mm'),
//         location:'Woodward lounge',
//         details:'A showing of The Hangover',
//         image:'hangover.jpg'
//     }
// ]
