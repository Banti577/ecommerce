const bycrypt = require('bcryptjs')

const nodemailer = require('nodemailer')

const redisClient = require('../config/redis.config')
const User = require('../models/usersModel');
const { generatejwttoken } = require('../services/Authentication');


const handleSignup = async (req, res) => {
    try {
        const { email, fullname, gender, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) return res.status(409).json('User Already Exist');

        const salt = await bycrypt.genSalt(10);
        const hashPassword = await bycrypt.hash(password, salt);

        let filename = req.file?.filename ?? undefined;

        const newUser = new User({
            fullName: fullname,
            email,
            gender,
            password: hashPassword,
            profileImg: filename
        })
        await newUser.save();
        return res.status(201).json({ msg: 'suceessfull' })

    } catch (err) {
        return res.status(400).json({ msg: 'signup failed please try after some time' })
    }
}

const handleLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        const ExistUser = await User.findOne({ email });
        if (!ExistUser) return res.status(404).json({ msg: "User Not Exist!" });
        const isMatch = await bycrypt.compare(password, ExistUser.password);

        if (!isMatch) return res.status(401).json('Password not Match');

        const token = generatejwttoken(ExistUser);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: 'lax',
            secure: false,
        })

        return res.status(200).json(`Welcome Again ${ExistUser.fullName}`);

    } catch (err) {
        return res.status(400).json({ msg: 'Login failed please try after some time' })
    }

}

const handleLogout = (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            path: '/'
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.log(err)
    }
}

const handleForgetAndResetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const ExistUser = await User.findOne({ email });
        if (!ExistUser) return res.status(404).json({ msg: "User Not Exist!" });

        const otp = Math.floor(100000 + Math.random() * 900000);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });


        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'Otp For forget Password',
            text: `Your OTP is ${otp}`,
            html: `<h1>Your OTP is ${otp}</h1>`
        };
        await redisClient.set('otp', otp);
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent' });

    } catch (err) {
        console.log(err)
    }
}

const handleVerifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        const Redisotp = await redisClient.get('otp');

        if (otp != Redisotp) return res.status(401).json({ message: 'otp not match' });

        return res.status(200).json({ message: 'otp match suceessfully' });
    } catch (err) {
        console.log(err)
    }
}

const generateNewPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User Not Exist!' });
        }

        const salt = await bycrypt.genSalt(10);
        const hashPassword = await bycrypt.hash(password, salt);

        user.password = hashPassword;
        await user.save();

        await redisClient.del('otp');

        return res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to update password' });
    }
}

const becomeSeller = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.role === "seller") {
            return res.status(400).json({ msg: "Already a seller" });
        }

        user.role = "seller";
        await user.save();

        const token = generatejwttoken(user);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: 'lax',
            secure: false,
        })

        return res.status(200).json({
            msg: "You are now a seller",
            user
        });

    } catch (error) {
        res.status(500).json({ msg: "Failed to become seller" });
    }
};




module.exports = { handleSignup, handleLogin, handleLogout, becomeSeller, handleForgetAndResetPassword, handleVerifyOtp, generateNewPassword }
