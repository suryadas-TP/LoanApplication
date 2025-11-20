const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const appCtrl = require('../controllers/applicant.controllers');

router.post('/', auth, appCtrl.createApplicant);
router.get('/:id', auth, appCtrl.getApplicant);
router.get('/by-loan/:loanId', auth, appCtrl.getApplicantsByLoan);
router.put('/:id', auth, appCtrl.updateApplicant);
router.delete('/:id', auth, appCtrl.deleteApplicant);

module.exports = router;

