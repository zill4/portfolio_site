import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreateProject from './pages/CreateProject';
import CreateBlogPost from './pages/CreateBlogPost';
import PrivateRoute from './components/privateRoute';
import { AuthContext } from './contexts/authContext';
import { ThemeProvider } from './contexts/themeContext';
import ThemeToggle from './components/themeToggle';
import './App.css';

function App() {

  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // You might want to navigate to the home page or login page after logout
  };

  return (
    <ThemeProvider>
      <div className="App">

        <header>
          <div class="container">
            <nav>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                {currentUser ? (
                  <>
                    <li><a href="/dashboard ">Admin Dashboard</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                  </>
                )
                  :
                  <li><a href="/login">Admin</a></li>}
                <ThemeToggle />
              </ul>
            </nav>
            <form action="{{ url_for('main.search') }}" method="GET" class="search-form">
              <input type="text" name="q" placeholder="Search..." required />
              <button type="submit">Search</button>
            </form>
          </div>
        </header>

        <main class="container">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/create-project" element={
                <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
              }
              />
              <Route path="/create-blog-post" element={
                <PrivateRoute>
                <CreateBlogPost />
              </PrivateRoute>
              } />
            </Routes>
          </Router>
        </main>

        {/* <footer>
        <div class="container">
          <p>&copy; 2024 crispcode.io All rights reserved.</p>
        </div>
      </footer> */}

      </div>
    </ThemeProvider>
  );
}

export default App;
