import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateProject from './pages/CreateProject';
import CreateBlogPost from './pages/CreateBlogPost';
import BlogDetail from './pages/BlogDetail';
import PrivateRoute from './components/privateRoute';
import ProjectDetail from './pages/ProjectDetail';
import { AuthContext } from './contexts/authContext';
import { ThemeProvider } from './contexts/themeContext';
import ThemeToggle from './components/themeToggle';
import './App.css';

function App() {
  const { currentUser, logout } = useContext(AuthContext);
  const isAdminSubdomain = window.location.hostname.startsWith('admin.');

  const handleLogout = () => {
    logout();
  };

  return (
    <ThemeProvider>
      <Router>
      <div className="App">
          <header className="header">
            <div className="container header-content">
              <div className="logo">
                <Link to="/">crispcode.io</Link>
              </div>
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  <li><Link to="/about">About</Link></li>
                  {isAdminSubdomain && (
                    <>
                      {currentUser ? (
                        <>
                          <li><Link to="/dashboard">Admin Dashboard</Link></li>
                          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                        </>
                      ) : (
                        <li><Link to="/login">Admin</Link></li>
                      )}
                    </>
                  )}
                  <li><ThemeToggle /></li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              {isAdminSubdomain && <Route path="/login" element={<Login />} />}
              <Route path="/create-project" element={
                <PrivateRoute>
                  <CreateProject />
                </PrivateRoute>
              } />
              <Route path="/create-blog-post" element={
                <PrivateRoute>
                  <CreateBlogPost />
                </PrivateRoute>
              } />
            </Routes>
          </main>

          <footer className="footer">
            <div className="container">
              <p>&copy; 2024 crispcode.io All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;