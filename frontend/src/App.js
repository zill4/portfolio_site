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
import BlogDetail from './pages/BlogDetail';
import PrivateRoute from './components/privateRoute';
import ProjectDetail from './pages/ProjectDetail';
import { AuthContext } from './contexts/authContext';
import { ThemeProvider } from './contexts/themeContext';
import ThemeToggle from './components/themeToggle';
import { Link } from 'react-router-dom';
import './App.css';

function App() {

  const { currentUser, logout } = useContext(AuthContext);
  const isAdminSubdomain = window.location.hostname.startsWith('admin.');

  const handleLogout = () => {
    logout();
    // You might want to navigate to the home page or login page after logout
  };

  return (
    <ThemeProvider>
      <Router>
      <div className="App">

        <header>
          <div class="container">
            <nav>
              <ul>
              <li><Link to="/" >Home</Link></li>
              <li><Link to="/blog" >Blog</Link></li>
                <li><Link to="/projects" >Projects</Link></li>
                <li><Link to="/about" >About</Link></li>
                {/* <li><a href="/contact">Contact</a></li> */}
                {isAdminSubdomain && (
                <>
                  {currentUser ? (
                    <>
                      <li><Link to="/dashboard " >Admin Dashboard</Link></li>
                      <li><a onClick={handleLogout}>Logout</a></li>
                    </>
                  )
                    :
                    <li><Link to="/login" >Admin</Link></li>}
                  </>
                )}
                <ThemeToggle />
              </ul>
            </nav>
            {/* <form action="{{ url_for('main.search') }}" method="GET" class="search-form">
              <input type="text" name="q" placeholder="Search..." required />
              <button type="submit">Search</button>
            </form> */}
          </div>
        </header>

        <main class="container">
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
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
              }
              />
              <Route path="/create-blog-post" element={
                <PrivateRoute>
                <CreateBlogPost />
              </PrivateRoute>
              } />
            </Routes>
        </main>

        {/* <footer>
        <div class="container">
        <p>&copy; 2024 crispcode.io All rights reserved.</p>
        </div>
        </footer> */}

      </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;
