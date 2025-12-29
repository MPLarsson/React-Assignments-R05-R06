import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import DogGame from './components/DogGame';

// Protected Route Component
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Router basename="/React-Assignments-R05-R06">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/game" 
          element={
            <ProtectedRoute>
              <DogGame />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
