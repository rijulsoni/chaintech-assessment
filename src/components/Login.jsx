import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userIndex = users.findIndex(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (userIndex !== -1) {
        navigate(`/user/${userIndex}`, { state: { index: userIndex } });
      } else {
        setLoginError("Invalid email or password.");
      }
    }
  };

  const renderInput = (label, name, type = "text", placeholder = "") => (
    <div className={`form-group mb-3 ${name}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        required
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="form-container mx-auto w-50">
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          {renderInput("Email", "email", "email", "Enter email")}
          {renderInput("Password", "password", "password", "Enter password")}
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>

          {loginError && <p className="text-danger mt-3">{loginError}</p>}

          <p className="mt-3">
            Don&apos;t have an account?
            <Link to="/signup" className="text-decoration-none ms-1">
              Create one here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
