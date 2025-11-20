require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/error.middleware');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());


const uploadDir = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));


const authRoutes = require('./routes/auth.routes');
const loanRoutes = require('./routes/loan.routes');
const applicantRoutes = require('./routes/applicant.routes');
const documentRoutes = require('./routes/document.routes');

app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/documents', documentRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('failed to connect to DATABASE', err);
    })


    