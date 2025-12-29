import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DogGame.css';

function DogGame() {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const currentUser = localStorage.getItem('currentUser');

  // Function to fetch a random dog image
  const fetchRandomDog = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      
      if (data.status === 'success') {
        setDogImage(data.message);
      } else {
        setError('Failed to fetch dog image');
      }
    } catch (err) {
      setError('Error fetching dog image: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a dog image when component mounts
  useEffect(() => {
    fetchRandomDog();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <div className="dog-game-container">
        <h1>Random Dog Generator</h1>
        <p className="user-greeting">Welcome, {currentUser}!</p>
        <p>Click the button to see a new random dog!</p>

      <div className="dog-image-container">
        {loading && <div className="loading">Loading...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && dogImage && (
          <img 
            src={dogImage} 
            alt="A random dog" 
            className="dog-image"
          />
        )}
      </div>

      <button 
        onClick={fetchRandomDog} 
        className="new-dog-button"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Show Me Another Dog!'}
      </button>
      </div>
    </>
  );
}

export default DogGame;
