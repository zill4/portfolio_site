import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Home() {
    const [recentPosts, setRecentPosts] = useState([]);
    const [featuredProjects, setFeaturedProjects] = useState([]);
    useEffect(() => {
        fetchRecentPosts();
        fetchFeaturedProjects();
    }, []);

    const fetchRecentPosts = async () => {
        try {
            const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'), limit(3));
            const querySnapshot = await getDocs(q);
            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRecentPosts(posts);
        } catch (error) {
            console.error("Error fetching recent posts: ", error);
        }
    };

    const fetchFeaturedProjects = async () => {
        try {
            const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(3));
            const querySnapshot = await getDocs(q);
            const projects = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFeaturedProjects(projects);
        } catch (error) {
            console.error("Error fetching featured projects: ", error);
        }
    };

    return (
        <div>
            <section id="hero">
                <h1>Welcome to My Portfolio</h1>
                <p>Explore my latest blog posts, projects, and more.</p>
            </section>

            <section id="recent-posts">
                <h2>Recent Blog Posts</h2>
                {recentPosts.map(post => (
                    <article key={post.id} className="blog-post">
                        <h3><Link to={`/blog/${post.id}`}>{post.title}</Link></h3>
                        <p className="date">{new Date(post.createdAt).toLocaleDateString()}</p>
                        <Link to={`/blog/${post.id}`}>Read more</Link>
                    </article>
                ))}
                <Link to="/blog" className="btn">View All Blog Posts</Link>
            </section>

            <section id="about">
                <h2>About Me</h2>
                <p>I'm a passionate developer with expertise in web technologies. I love creating responsive and user-friendly applications.</p>
            </section>

            <section id="projects">
                <h2>Featured Projects</h2>
                {featuredProjects.map(project => (
                    <div key={project.id} className="project">
                        <h3><Link to={`/project/${project.id}`}>{project.title}</Link></h3>
                        <p>{project.description.substring(0, 100)}...</p>
                        <Link to={`/project/${project.id}`} className="btn">View Project</Link>
                    </div>
                ))}
                <Link to="/projects" className="btn">View All Projects</Link>
            </section>

            <section id="links">
                <h2>Important Links</h2>
                <ul>
                    <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><Link to="/blog">Blog</Link></li>
                </ul>
            </section>
        </div>
    );
}

export default Home;