const Document = require('../models/Document.model');
const Applicant = require('../models/Applicant.model');
const LoanApplication = require('../models/LoanApplication.model');
const fs = require('fs');


const uploadDocument = async (req, res) => {
    const applicantId = req.body.applicantId || req.query.applicantId;
    const loanId = req.body.loanId || req.query.loanId;

    if (!req.file) return res.status(400).json({ message: 'No file provided' });
    if (!applicantId) return res.status(400).json({ message: 'applicantId is required' });

    const applicant = await Applicant.findById(applicantId);
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });

    const loan = loanId ? await LoanApplication.findById(loanId) : null;

    const doc = await Document.create({
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadedBy: req.user._id,
        applicant: applicant._id,
        loanApplication: loan ? loan._id : applicant.loanApplication
    });

    applicant.documents.push(doc._id);
    await applicant.save();
    if (loan && !loan.applicants.includes(applicant._id)) {
        loan.applicants.push(applicant._id);
        await loan.save();
    }

    res.status(201).json(doc);
};

const listDocumentsByApplicant = async (req, res) => {
    const { applicantId } = req.params;
    const docs = await Document.find({ applicant: applicantId }).sort({ createdAt: -1 });
    res.json(docs);
};

const getDocument = async (req, res) => {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.json(doc);
};

const downloadDocument = async (req, res) => {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.download(doc.path, doc.originalName);
};

const deleteDocument = async (req, res) => {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });


    await Applicant.findByIdAndUpdate(doc.applicant, { $pull: { documents: doc._id } });

    fs.unlink(doc.path, (err) => {
        if (err) console.warn('Failed to delete file:', err);
    });


    res.json({ message: 'Deleted' });
};

module.exports = {
    uploadDocument,
    listDocumentsByApplicant,
    getDocument,
    downloadDocument,
    deleteDocument,
}