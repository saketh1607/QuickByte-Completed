import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase-config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app-container ">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <h1>QuickByte Vnr</h1>
              </Link>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                {user && (
                  <li>
                    <button
                      className="btn btn-danger"
                      onClick={() => signOut(auth)}
                    >
                      Log Out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-auth" element={<UserAuth />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="auth-options">
        <Link to="/user-auth" className="btn btn-primary">
          User Portal
        </Link>
        <Link to="/admin-auth" className="btn btn-admin">
          Admin Portal
        </Link>
      </div>
    </div>
  );
}

function UserAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e, isRegister) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      window.location.href = 'http://localhost:5173/';
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>User Authentication</h2>
        <form onSubmit={(e) => handleSubmit(e, false)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-buttons">
            <button type="submit" className="btn btn-login">
              Login
            </button>
            <button
              type="button"
              className="btn btn-register"
              onClick={(e) => handleSubmit(e, true)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'http://localhost:5174/';
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container admin-auth">
      <div className="auth-form">
        <h2>Admin Authentication</h2>
        <form onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-admin">
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
