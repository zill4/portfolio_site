import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);

    const postsPerPage = 5; // Adjust as needed

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'), limit(postsPerPage));
            const querySnapshot = await getDocs(q);
            const fetchedPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(fetchedPosts);
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
        setLoading(false);
    };

    const fetchMorePosts = async () => {
        if (!lastVisible) return;
        setLoading(true);
        try {
            const q = query(collection(db, 'blogPosts'), 
                            orderBy('createdAt', 'desc'), 
                            startAfter(lastVisible), 
                            limit(postsPerPage));
            const querySnapshot = await getDocs(q);
            const fetchedPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts([...posts, ...fetchedPosts]);
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        } catch (error) {
            console.error("Error fetching more posts: ", error);
        }
        setLoading(false);
    };

    return (
        <div className="blog">
            <h1>Blog Posts</h1>
            <Link to="/create-blog-post" className="btn">New Post</Link>
            <Link to="/login" className="btn">Admin Login</Link>
            
            {posts.map(post => (
                <article key={post.id} className="blog-post">
                    <h2><Link to={`/blog/${post.id}`}>{post.title}</Link></h2>
                    <p className="date">{new Date(post.createdAt).toLocaleDateString()}</p>
                    <p>{post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}</p>
                    <Link to={`/blog/${post.id}`}>Read more</Link>
                </article>
            ))}

            {loading && <p>Loading...</p>}
            
            {lastVisible && (
                <button onClick={fetchMorePosts} className="btn" disabled={loading}>
                    Load More
                </button>
            )}
        </div>
    );
}

export default Blog;