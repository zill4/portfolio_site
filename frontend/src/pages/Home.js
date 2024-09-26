import React, { useEffect, useState } from 'react';

function Home() {

    return (
        <div>
            <section id="hero">
                <h1>Welcome to My Portfolio</h1>
                <p>Explore my latest blog posts, projects, and more.</p>
            </section>

            <section id="recent-posts">
                <h2>Recent Blog Posts</h2>
                <article class="blog-post">
                    <h3><a href="{{ url_for('blog.blog_post', post_id=post.id) }}">post.title here</a></h3>
                    <p class="date">post.date_posted.strftime('%Y-%m-%d')</p>
                    <a href="{{ url_for('blog.blog_post', post_id=post.id) }}">Read more</a>
                </article>
                <a href="{{ url_for('blog.blog') }}" class="btn">View All Blog Posts</a>
            </section>

            <section id="about">
                <h2>About Me</h2>
                <p>I'm a passionate developer with expertise in web technologies. I love creating responsive and user-friendly applications.</p>
            </section>

            <section id="projects">
                <h2>Featured Projects</h2>
                {/* <!-- Add a few featured projects here --> */}
                <a href="{{ url_for('projects.projects') }}" class="btn">View All Projects</a>
            </section>

            <section id="links">
                <h2>Important Links</h2>
                <ul>
                    <li><a href="https://github.com/yourusername" target="_blank">GitHub</a></li>
                    <li><a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a></li>
                    <li><a href="{{ url_for('blog.blog') }}">Blog</a></li>
                </ul>
            </section>
        </div>
    );
}

export default Home;