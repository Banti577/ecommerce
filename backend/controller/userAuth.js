const bycrypt = require('bcryptjs')
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

        res.status(200).json({
            msg: "You are now a seller",
            user
        });

    } catch (error) {
        res.status(500).json({ msg: "Failed to become seller" });
    }
};


module.exports = { handleSignup, handleLogin, handleLogout, becomeSeller }