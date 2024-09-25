from flask import Blueprint, render_template
from models import BlogPost

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    recent_posts = BlogPost.query.order_by(BlogPost.date_posted.desc()).limit(3).all()
    return render_template('index.html', recent_posts=recent_posts)
