export const fields = {
  email: {
    name: "email",
    type: "email",
    placeholder: "Email",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    },
  },
  fullName: {
    name: "fullName",
    type: "text",
    placeholder: "Full Name",
    rules: {
      required: "Full name is required",
      minLength: {
        value: 2,
        message: "Full name must be at least 2 characters",
      },
    },
  },
  username: {
    name: "username",
    type: "text",
    placeholder: "Username",
    rules: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters",
      },
    },
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
    rules: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
};
