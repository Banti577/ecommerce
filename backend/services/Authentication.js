const jwt = require('jsonwebtoken')

const generatejwttoken = (user) => {
    const payload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        profileImg: user.profileImg,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token;
}

const verifyjwttoken = (cookieName) => {
    return (req, res, next) => {
        try {
            const cookie = req.cookies[cookieName]?.trim();
            if (!cookie) return res.status(401).json({ msg: '401 Unauthorize access please login first' });

            const userPayload = jwt.verify(cookie, process.env.JWT_SECRET)
            req.user = userPayload;
            next();
        } catch (err) {
            console.error(err)
            return res.status(401).json({ msg: 'Invalid or expired token' });
        }
    }

}

module.exports = { generatejwttoken, verifyjwttoken }