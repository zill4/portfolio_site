from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user, login_required, logout_user
from werkzeug.security import check_password_hash
from models import db, BlogPost, User

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        print(f"Debug: Submitted username: {username}")  # Debug info
        print(f"Debug: Submitted password: {password}")  # Debug info (remove in production)
        user = User.query.filter_by(username=username).first()
        print(f"Debug: User exists: {user is not None}")  # Debug info
        if user:
            password_check = check_password_hash(user.password_hash, password)
            print(f"Debug: Password check passed: {password_check}")  # Debug info
            if password_check:
                login_user(user)
                return redirect(url_for('admin.dashboard'))
        flash('Invalid username or password', 'error')
    return render_template('admin/login.html')

@admin_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))

@admin_bp.route('/dashboard')
@login_required
def dashboard():
    posts = BlogPost.query.order_by(BlogPost.date_posted.desc()).all()
    return render_template('admin/dashboard.html', posts=posts)

@admin_bp.route('/new_post', methods=['GET', 'POST'])
@login_required
def new_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        new_post = BlogPost(title=title, content=content)
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
