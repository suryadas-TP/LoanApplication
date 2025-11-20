const Applicant = require('../models/Applicant.model');
const LoanApplication = require('../models/LoanApplication.model');

const createApplicant = async (req, res) => {

    const { name, email, phone } = req.body;
    const { loanId } = req.body;

    if (!loanId) {
        return res.status(400).json({ message: 'loanId required' })
    };

    const loan = await LoanApplication.findById(loanId);
    if (!loan) {
        return res.status(404).json({ message: 'loan not found' })
    };

    const applicant = await Applicant.create({ name, email, phone, loanApplication: loan._id });
    loan.applicants.push(applicant._id);
    await loan.save();

    res.status(201).json(applicant);
};

const getApplicant = async (req, res) => {
    const applicant = await Applicant.findById(req.params.id).populate('documents');
    if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found' })
    };
    res.json(applicant);
};

const getApplicantsByLoan = async (req, res) => {
    const { loanId } = req.params;
    const applicants = await Applicant.find({ loanApplication: loanId }).populate('documents');
    res.json(applicants)
}

const updateApplicant = async (req, res) => {
    const app = await Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!app) {
        return res.status(404).json({ message: 'Applicant not found' });
    }
    res.json(app);
};

const deleteApplicant = async (req, res) => {
    const app = await Applicant.findByIdAndDelete(req.params.id);
    if (app) {
        await LoanApplication.findByIdAndUpdate(app.loanApplication, { $pull: { applicants: app._id } });
        res.json({ message: 'Deleted' });
    } else {
        res.status(404).json({ message: 'Applicants not found' })
    }
};


module.exports = {
    createApplicant,
    getApplicant,
    getApplicantsByLoan,
    updateApplicant,
    deleteApplicant,
};