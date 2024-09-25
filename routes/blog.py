from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from models import db, BlogPost
import logging

blog_bp = Blueprint('blog', __name__)
logger = logging.getLogger(__name__)

@blog_bp.route('/')
def blog():
    page = request.args.get('page', 1, type=int)
    posts = BlogPost.query.order_by(BlogPost.date_posted.desc()).paginate(page=page, per_page=5)
    return render_template('blog.html', posts=posts)

@blog_bp.route('/<int:post_id>')
def blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return render_template('blog_post.html', post=post)

@blog_bp.route('/new', methods=['GET', 'POST'])
@login_required
def new_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        new_post = BlogPost(title=title, content=content, author=current_user)
        try:
            db.session.add(new_post)
            db.session.commit()
            flash('New blog post created successfully!', 'success')
            return redirect(url_for('blog.blog'))
        except Exception as e:
            logger.error(f"Error creating new blog post: {str(e)}")
            flash('An error occurred while creating the blog post', 'error')
            return render_template('blog_post.html')
    return render_template('admin/post_form.html')
