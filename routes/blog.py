from flask import Blueprint, render_template, request, redirect, url_for
from models import db, BlogPost

blog_bp = Blueprint('blog', __name__)

@blog_bp.route('/')
def blog():
    posts = BlogPost.query.order_by(BlogPost.date_posted.desc()).all()
    return render_template('blog.html', posts=posts)

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
        db.session.add(new_post)
        db.session.commit()
        return redirect(url_for('blog.blog'))
    return render_template('blog_post.html')
