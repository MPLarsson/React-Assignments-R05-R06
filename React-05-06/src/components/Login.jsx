import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Get stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if user is registered
    if (!storedUsername || !storedPassword) {
      setError('No account found. Please register first.');
      return;
    }

    // Validate credentials
    if (username === storedUsername && password === storedPassword) {
      // Set logged in status
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', username);
      
      // Redirect to game
      navigate('/game');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back!</h1>
        <p className="auth-subtitle">Login to continue playing</p>

        {error && (
          <div className="error-message">{error}</div>
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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
