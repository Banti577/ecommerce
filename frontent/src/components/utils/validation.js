  const validators = {
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