from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash
from models import db, BlogPost, User, Project
import logging
from datetime import datetime

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            flash('Logged in successfully.', 'success')
            return redirect(url_for('admin.dashboard'))
        flash('Invalid username or password', 'error')
        logging.error(f"Login failed for user {username}. User exists: {user is not None}")
    return render_template('admin/login.html')

@admin_bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully.', 'success')
    return redirect(url_for('main.index'))

@admin_bp.route('/dashboard')
@login_required
def dashboard():
    posts_page = request.args.get('posts_page', 1, type=int)
    projects_page = request.args.get('projects_page', 1, type=int)
    
    posts = BlogPost.query.order_by(BlogPost.date_posted.desc()).paginate(page=posts_page, per_page=5)
    projects = Project.query.order_by(Project.id.desc()).paginate(page=projects_page, per_page=5)
    
    return render_template('admin/dashboard.html', posts=posts, projects=projects)

@admin_bp.route('/new_post', methods=['GET', 'POST'])
@login_required
def new_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        new_post = BlogPost(title=title, content=content, author=current_user)
        db.session.add(new_post)
        db.session.commit()
        flash('New post created successfully!', 'success')
        return redirect(url_for('admin.dashboard'))
    return render_template('admin/post_form.html')

@admin_bp.route('/edit_post/<int:post_id>', methods=['GET', 'POST'])
@login_required
def edit_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    if request.method == 'POST':
        post.title = request.form['title']
        post.content = request.form['content']
        post.date_posted = datetime.utcnow()  # Update the post date
        db.session.commit()
        flash('Post updated successfully!', 'success')
        return redirect(url_for('admin.dashboard'))
    return render_template('admin/post_form.html', post=post)

@admin_bp.route('/delete_post/<int:post_id>', methods=['POST'])
@login_required
def delete_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    flash('Post deleted successfully!', 'success')
    return redirect(url_for('admin.dashboard'))

@admin_bp.route('/new_project', methods=['GET', 'POST'])
@login_required
def new_project():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        github_link = request.form['github_link']
        live_link = request.form['live_link']
        new_project = Project(title=title, description=description, github_link=github_link, live_link=live_link)
        db.session.add(new_project)
        db.session.commit()
        flash('New project created successfully!', 'success')
        return redirect(url_for('admin.dashboard'))
    return render_template('admin/project_form.html')

@admin_bp.route('/edit_project/<int:project_id>', methods=['GET', 'POST'])
@login_required
def edit_project(project_id):
    project = Project.query.get_or_404(project_id)
    if request.method == 'POST':
        project.title = request.form['title']
        project.description = request.form['description']
        project.github_link = request.form['github_link']
        project.live_link = request.form['live_link']
        db.session.commit()
        flash('Project updated successfully!', 'success')
        return redirect(url_for('admin.dashboard'))
    return render_template('admin/project_form.html', project=project)

@admin_bp.route('/delete_project/<int:project_id>', methods=['POST'])
@login_required
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    flash('Project deleted successfully!', 'success')
    return redirect(url_for('admin.dashboard'))
