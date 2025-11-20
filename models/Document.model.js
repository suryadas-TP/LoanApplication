const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String
    },
    size: {
        type: Number
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant'
    },
    loanApplication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanApplication'
    },

}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);