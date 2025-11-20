const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    loanApplication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanApplication',
    },
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Applicant', applicationSchema);