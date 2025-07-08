import React, { useState } from "react";
import { LineWave } from "react-loader-spinner";
import Modal from "react-modal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { userLogin } from "../service/auth";
import "../styles/login.css";
import { useDispatch } from "react-redux";
import { fetchUserLogin } from "../../toolkit/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let initial = { email: "", password: "" };
  const [loginUser, setLoginUser] = useState(initial);
  const [error, setError] = useState(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateField = (name, value) => {
    let message = "";
    if (!value) {
      message = "This field is required";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        message = "Please enter a valid email address";
      }
    }
    setError((prev) => ({ ...prev, [name]: message }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(loginUser).some((v) => !v);
    Object.entries(loginUser).forEach(([key, value]) =>
      validateField(key, value)
    );
    if (hasErrors) {
      toast.error("Please fill all the required details");
      return;
    }

    setIsSubmitting(true);
    const resultAction = await dispatch(
      fetchUserLogin({ userLogin, loginUser })
    );
    console.log("resultAction", resultAction.payload);

    if (fetchUserLogin.fulfilled.match(resultAction)) {
      setLoginUser(initial);
      setIsSubmitting(false);
      navigate("/");
      if (resultAction.payload.success) {
        toast.success(resultAction.payload.message);
      }
    } else {
      const errorMessage = resultAction.payload?.message || "Login failed";
      toast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              placeholder="Enter Your Email"
              type="text"
              value={loginUser.email}
              name="email"
              onChange={handleOnChange}
            />
            <span className="error-message">{error?.email}</span>
          </div>

          <div className="form-group password-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                className="form-input password-input"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                value={loginUser.password}
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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="signup-link">
            Don't have an account?
            <a href="/signup" className="signup-anchor">
              Sign up
            </a>
          </div>
        </form>
      </div>

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

export default Login;
