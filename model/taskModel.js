var mongoose = require('mongoose');
// Setup schema
var taskSchema = new mongoose.Schema({
    _id :{
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    deadline :{
        type: Date
    }
});
// Export Contact model
module.exports = mongoose.model('task', taskSchema);
