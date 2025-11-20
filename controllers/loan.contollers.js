const LoanApplication = require('../models/LoanApplication.model');

const createLoan = async (req, res) => {
    const { title } = req.body;
    const loan = await LoanApplication.create({ title, createdBy: req.user._id });
    res.status(201).json(loan);
};

const getLoans = async (req, res) => {
    const loans = await LoanApplication.find().populate('applicants');
    res.json(loans)
};

const getLoanById = async (req, res) => {
    const loan = await LoanApplication.findById(req.params.id)
    .populate({ path: 'applicants', populate: { path: 'documents' } });
    if (!loan) {
        return res.status(404).json({ message: 'loan not found' });
    }
    res.json(loan);
}

const updateLoan = async (req,res)=>{
    const loan = await LoanApplication.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!loan){
        return res.status(404).json({message:'loan not found'});
    };
    res.status(loan);
};

const deleteLoan = async(req,res)=>{
    await LoanApplication.findByIdAndDelete(req.params.id);
    res.json({message:'Deleted'});
};

module.exports = {
    createLoan,
    getLoans,
    getLoanById,
    updateLoan,
    deleteLoan,
}