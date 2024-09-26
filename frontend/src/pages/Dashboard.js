function Dashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div class="alert alert-{{ category }}"> message </div>
            <section id="blog-posts">
                <h2>Blog Posts</h2>
                <a href="{{ url_for('admin.new_post') }}" class="btn">Create New Post</a>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date Posted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> post.title </td>
                            <td>post.date_posted.strftime('%Y-%m-%d %H:%M')</td>
                            <td>
                                <a href="{{ url_for('admin.edit_post', post_id=post.id) }}" class="btn btn-small">Edit</a>
                                <form action="{{ url_for('admin.delete_post', post_id=post.id) }}" method="POST" style="display: inline;">
                                    <button type="submit" class="btn btn-small btn-danger" onclick="return confirm('Are you sure you want to delete this post?')">Delete</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="pagination">
                    <a href="{{ url_for('admin.dashboard', posts_page=page, projects_page=projects.page) }}"> page </a>
                    <strong>page </strong>
                    <span class="ellipsis">…</span>
                </div>
            </section>
            <section id="projects">
                <h2>Projects</h2>
                <a href="{{ url_for('admin.new_project') }}" class="btn">Create New Project</a>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>project.title </td>
                            <td>
                                <a href="{{ url_for('admin.edit_project', project_id=project.id) }}" class="btn btn-small">Edit</a>
                                <form action="{{ url_for('admin.delete_project', project_id=project.id) }}" method="POST" style="display: inline;">
                                    <button type="submit" class="btn btn-small btn-danger" onclick="return confirm('Are you sure you want to delete this project?')">Delete</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination">
                    <a href="{{ url_for('admin.dashboard', posts_page=posts.page, projects_page=page) }}"> page </a>
                    <strong> page </strong>
                    <span class="ellipsis">…</span>

                </div>
            </section>
        </div>
    );
}

export default Dashboard;