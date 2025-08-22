import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchUserLogin } from '../../toolkit/userSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import LoadingModal from '../components/LoadingModal';
import '../styles/login.css';
import { userLogin } from '../service/auth';

const Login = () => {
  const initial = { email: '', password: '' };
  const [loginUser, setLoginUser] = useState(initial);
  const [error, setError] = useState(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirectPath = location.state?.from || '/';

  const validateField = (name, value) => {
    let message = '';
    if (!value) {
      message = 'This field is required';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        message = 'Please enter a valid email address';
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
      toast.error('Please fill all the required details');
      return;
    }

    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(
        fetchUserLogin({
          email: loginUser.email,
          password: loginUser.password,
          userLogin,
        })
      );

      if (fetchUserLogin.fulfilled.match(resultAction)) {
        if (resultAction.payload.success) {
          toast.success(resultAction.payload.message);
          setLoginUser(initial);
          navigate(redirectPath); // Redirect to original target
        } else {
          toast.error(resultAction.payload.message || 'Login failed');
        }
      } else {
        toast.error(resultAction.payload?.message || 'Login failed');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Something went wrong');
    } finally {
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
                type={showPassword ? 'text' : 'password'}
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
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <div className="signup-link">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="signup-anchor"
              state={{ from: redirectPath }}
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>

      <LoadingModal isSubmitting={isSubmitting} />
    </div>
  );
};

export default Login;
