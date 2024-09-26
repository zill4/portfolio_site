function Blog() {
    return (
        <><h1>Blog Posts</h1><a href="{{ url_for('admin.new_post') }}" class="btn">New Post</a><a href="{{ url_for('admin.login') }}" class="btn">Admin Login</a><article class="blog-post">
            <h2><a href="{{ url_for('blog.blog_post', post_id=post.id) }}"> post.title </a></h2>
            <p class="date"> post.date_posted.strftime('%Y-%m-%d') </p>
            <p> post.content[:200] if post.content|length  200 ...endif </p>
            <a href="{{ url_for('blog.blog_post', post_id=post.id) }}">Read more</a>
        </article><div class="pagination">
                <a href="{{ url_for('blog.blog', page=posts.prev_num) }}">&laquo; Previous</a>
                {/* {% for page_num in posts.iter_pages(left_edge=1, right_edge=1, left_current=1, right_current=2) %} */}
                <span class="current-page"> page_num </span>
                <a href="{{ url_for('blog.blog', page=page_num) }}"> page_num </a>
                <span class="ellipsis">...</span>

                <a href="{{ url_for('blog.blog', page=posts.next_num) }}">Next &raquo;</a>
            </div></>
    );
}

export default Blog;