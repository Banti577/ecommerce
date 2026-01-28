const NAME_REGEX = /^[a-zA-Z ]{3,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const PHONE_REGEX = /^\\d{3}-\\d{3}-\\d{4}$/;
const SKU_REGEX = /^[A-Z0-9-_]{3,20}$/;

module.exports = {
    NAME_REGEX,
    EMAIL_REGEX,
    PASSWORD_REGEX,
    PHONE_REGEX,
};
