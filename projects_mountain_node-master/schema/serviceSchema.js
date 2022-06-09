const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    serviceDescription: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    upiId: {
        type: String,
        required: true
    },
    pictureLink: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    createdBy: {
        type: ObjectId,
        ref: 'user'
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('services', serviceSchema)