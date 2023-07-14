"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const db_1 = require("../db");
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION;
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM;
// Registration
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const db = (0, db_1.getDB)();
        const result = yield db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const db = (0, db_1.getDB)();
        const user = yield db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const accessToken = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
        const refreshToken = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
        res.json({ accessToken, refreshToken });
    }
    catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Forgot Password
router.post('/forgot-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const db = (0, db_1.getDB)();
        const user = yield db.collection('users').findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Generate a password reset token
        const resetToken = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        // Create the password reset URL
        const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;
        // Send password reset email
        const transporter = nodemailer_1.default.createTransport({
            service: 'your_email_service',
            auth: {
                user: EMAIL_USERNAME,
                pass: EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: EMAIL_FROM,
            to: email,
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetURL}">here</a> to reset your password</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('Password reset email sent:', info.response);
            res.json({ message: 'Password reset email sent' });
        });
    }
    catch (err) {
        console.error('Error during password reset:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
