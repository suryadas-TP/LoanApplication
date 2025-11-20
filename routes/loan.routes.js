const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const loanCntrl = require('../controllers/loan.contollers');

router.post('/', auth, loanCntrl.createLoan);
router.get('/',auth,loanCntrl.getLoans);
router.get('/:id',auth,loanCntrl.getLoanById);
router.put('/:id',auth,loanCntrl.updateLoan);
router.delete('/:id',auth,loanCntrl.deleteLoan);

module.exports = router;