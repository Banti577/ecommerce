const { EMAIL_REGEX, PASSWORD_REGEX } = require("../utils/validationHelper");
const validateLogin = (req, res, next) => {
    let { email, password } = req.body;

    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ message: "Invalid password" });
    }

    next();
};
module.exports = { validateLogin }