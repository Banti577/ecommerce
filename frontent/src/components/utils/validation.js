export const validators = {

  fullname: (v) => {
    if (!v) return "";
    if (v.trim() === '') return 'Name is required';
    return /^[a-zA-Z\s'-]{2,}$/.test(v) ? "" : 'Invalid name';
  },
  email: (v) => {
    if (!v) return "";
    if (v.trim() === "") return "Empty not allowed";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Invalid email";
  },
  password: (v) => {
    if (!v) return "";
    if (v.trim() === "") return "Empty not allowed";
    return v.length >= 6 ? "" : "Password must be at least 6 characters";
  },
};