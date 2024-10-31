import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import axios from "axios";
import Header from "../../components/Header/Header";
import "./login.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [backendError, setBackendError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", formData, {
        withCredentials: true,
      });
      dispatch(login(response.data.token));
      navigate("/");
    } catch (error) {
      if (error.response) {
        setBackendError(error.response.data.message);
      } else {
        setBackendError("An unexpected error occurred");
      }
      setTimeout(() => {
        setBackendError("");
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-main-container">
        <div className="row">
          <div className="col-sm-6 col-md-12 form-section">
            <div className="login-wrapper">
              <h2 className="login-title">Login</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-5">
                  <button type="submit" className="btn login-btn">
                    Login
                  </button>
                  <a href="#!" className="forgot-password-link">
                    Forgot Password?
                  </a>
                </div>
              </form>
              <p className="login-wrapper-footer-text">
                Need an account?{" "}
                <Link to="/signup" className="text-reset">
                  Signup here
                </Link>
              </p>
              {backendError && (
                <div className="alert alert-danger" role="alert">
                  {backendError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
