const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({

    _id : mongoose.Schema.Types.ObjectId,
    title : String,
    host: String,
    venue : String,

});

module.exports = mongoose.model('Events', eventSchema)

//https://github.com/anzairyo0127/mongodb-connection-bug