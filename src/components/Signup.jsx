import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const initialState = {
    name: "",
    email: "",
    password: "",
    city: "",
    gender: "",
    state: "",
    zip: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (userId !== undefined) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user, index) => index === parseInt(userId));
      if (user) {
        setFormData(user);
        setIsEditMode(true);
      }
    }
  }, [userId]);

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

    if (formData.zip && formData.zip.length !== 6) {
      newErrors.zip = "Zip code must be exactly 6 characters.";
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
      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (isEditMode) {
        users[parseInt(userId)] = formData;
        localStorage.setItem("users", JSON.stringify(users));
        alert("User details updated successfully!");
        navigate(`/user/${userId}`, { state: { index: userId } });
      } else {
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful!");
      }
    }
  };

  const backToUserDetails = (e) => {
    e.preventDefault();
    navigate(`/user/${userId}`, { state: { index: userId } });
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
        maxLength={name === "zip" ? 6 : undefined}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  const renderSelect = (label, name, options) => (
    <div className={`form-group mb-3 ${name}`}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        required
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="form-container mx-auto w-50">
        <form onSubmit={handleSubmit}>
          {renderInput("Name", "name", "text", "Enter name")}
          {renderInput("Email", "email", "email", "Enter email")}
          {renderInput("Password", "password", "password", "Enter password")}
          {renderInput("City", "city", "text", "Enter city")}
          {renderSelect("Gender", "gender", ["Male", "Female", "Other"])}
          {renderInput("State", "state", "text", "Enter state")}
          {renderInput("Zip", "zip", "text", "Enter zip code")}

          <button className="btn btn-primary" type="submit">
            {isEditMode ? "Update" : "Signup"}
          </button>
          {isEditMode ? (
            <button
              onClick={backToUserDetails}
              className="btn btn-secondary mx-2"
            >
              Cancel
            </button>
          ) : (
            <>
              <span className="mx-1">Already have an account?</span>
              <Link to="/" className="text-decoration-none ms-1">
                Login here.
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
