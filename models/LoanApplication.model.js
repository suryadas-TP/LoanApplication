const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Loan Application',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
    }],
    status: {
        type: String,
        enum: ['draft', 'submitted'],
        default: 'draft',
    },
}, { timestamps: true });

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);