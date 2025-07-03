import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LineWave } from "react-loader-spinner";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { userSignUp } from "../service/auth";
import { saveToLocalStorage } from "../helpers/localstorage";
import { useDispatch } from "react-redux";
import { setUser } from "../../toolkit/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const initial = {
    name: "",
    email: "",
    password: "",
  };
  const [signUpUser, setSignUpUser] = useState(initial);
  const [error, setError] = useState(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let message = "";
    if (!value) {
      message = "This field is required";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        message = "Please enter a valid email address";
      }
    } else if (name === "password" && value.length < 6) {
      message = "Password must be at least 6 characters";
    }
    setError((prev) => ({ ...prev, [name]: message }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSignUpUser((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Object.entries(signUpUser).forEach(([key, value]) =>
      validateField(key, value)
    );
    const hasErrors = Object.values(signUpUser).some((val) => !val);
    if (hasErrors) {
      toast.error("Please fill all the required details");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await userSignUp(signUpUser);

      if (!response?.data?.success) {
        toast.error(response?.data?.message || "Signup failed.");
        setIsSubmitting(false);
        return;
      }

      toast.success("Signup successful!");
      dispatch(
        setUser({
          name: response?.data?.data?.name,
          email: response?.data?.data?.email,
          userId: response?.data?.data?.userId,
        })
      );

      navigate("/");
      saveToLocalStorage(response?.data?.data?.token);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Sign Up</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              placeholder="Enter Your Name"
              type="text"
              className="form-input"
              value={signUpUser.name}
              name="name"
              onChange={handleOnChange}
            />
            <span className="error-message">{error?.name}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              placeholder="Enter Your Email"
              type="text"
              className="form-input"
              value={signUpUser.email}
              name="email"
              onChange={handleOnChange}
            />
            <span className="error-message">{error?.email}</span>
          </div>

          <div className="form-group password-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                className="form-input password-input"
                value={signUpUser.password}
                name="password"
                onChange={handleOnChange}
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <span className="error-message">{error?.password}</span>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            Sign Up
          </button>

          <div className="signup-link">
            Already have an account?
            <a href="/login" className="signup-anchor">
              Log in
            </a>
          </div>
        </form>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isSubmitting}
        contentLabel="Loading"
        className="login-modal"
        overlayClassName="login-modal-overlay"
      >
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#2c3e50"
          ariaLabel="line-wave-loading"
        />
      </Modal>
    </div>
  );
};

export default SignUp;
