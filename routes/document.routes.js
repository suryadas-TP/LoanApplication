const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const docCtrl = require('../controllers/document.controllers');

router.post('/upload', auth, upload.single('file'), docCtrl.uploadDocument);

router.get('/applicant/:applicantId', auth, docCtrl.listDocumentsByApplicant);
router.get('/:id', auth, docCtrl.getDocument);
router.get('/:id/download', auth, docCtrl.downloadDocument);
router.delete('/:id', auth, docCtrl.deleteDocument);

module.exports = router;
