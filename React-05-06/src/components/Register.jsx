import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Validate password requirements
  const validatePassword = (pwd) => {
    const errors = [];
    
    if (pwd.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      errors.push('Password must contain at least one symbol (!@#$%^&*...)');
    }
    
    if (!/[A-Z]/.test(pwd)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[0-9]/.test(pwd)) {
      errors.push('Password must contain at least one number');
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const newErrors = {};

    // Validate username
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    // Check if username already exists
    const existingUser = localStorage.getItem('username');
    if (existingUser === username) {
      newErrors.username = 'Username already exists. Please choose another.';
    }

    // Validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // If there are errors, display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    setSuccessMessage('Registration successful! Redirecting to login...');
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Join us to play the Dog Game!</p>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className={errors.username ? 'error-input' : ''}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={errors.password ? 'error-input' : ''}
            />
            {errors.password && (
              <div className="error-text">
                {Array.isArray(errors.password) ? (
                  <ul>
                    {errors.password.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                ) : (
                  errors.password
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error-input' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="password-requirements">
            <p><strong>Password Requirements:</strong></p>
            <ul>
              <li>At least 8 characters</li>
              <li>Contains a symbol (!@#$%...)</li>
              <li>Contains an uppercase letter</li>
              <li>Contains a number</li>
            </ul>
          </div>

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
