from flask import Blueprint, render_template, request, redirect, url_for, current_app
from models import db, BlogPost
import logging

blog_bp = Blueprint('blog', __name__)
logger = logging.getLogger(__name__)

@blog_bp.route('/')
def blog():
    try:
        posts = BlogPost.query.order_by(BlogPost.date_posted.desc()).all()
        return render_template('blog.html', posts=posts)
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        return "An error occurred while fetching blog posts", 500

@blog_bp.route('/<int:post_id>')
def blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return render_template('blog_post.html', post=post)

@blog_bp.route('/new', methods=['GET', 'POST'])
def new_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        new_post = BlogPost(title=title, content=content)
        try:
            db.session.add(new_post)
            db.session.commit()
            logger.info(f"New blog post created: {title}")
            return redirect(url_for('blog.blog'))
        except Exception as e:
            logger.error(f"Error creating new blog post: {str(e)}")
            return "An error occurred while creating the blog post", 500
    return render_template('blog_post.html')
