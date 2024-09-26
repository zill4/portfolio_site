function Projects() {
    return (
        <div class="project">
            <h2><a href="{{ url_for('projects.project_detail', project_id=project.id) }}"> project.title </a></h2>
            <p> project.description[:200]  if project.description|length  200 ...endif</p>
            <a href="{{ project.github_link }}" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="{{ project.live_link }}" target="_blank" rel="noopener noreferrer">Live Demo</a>
        </div>
    );
}

export default Projects;