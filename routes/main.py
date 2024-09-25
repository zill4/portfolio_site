from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_mail import Message
from models import BlogPost, Project
from main import app, mail
from sqlalchemy import or_

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    recent_posts = BlogPost.query.order_by(BlogPost.date_posted.desc()).limit(3).all()
    return render_template('index.html', recent_posts=recent_posts)

@main_bp.route('/about')
def about():
    return render_template('about.html')

@main_bp.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        msg = Message('New Contact Form Submission',
                      sender=email,
                      recipients=['your-email@example.com'])  # Replace with your email
        msg.body = f"Name: {name}\nEmail: {email}\nMessage: {message}"
        
        try:
            mail.send(msg)
            flash('Your message has been sent successfully!', 'success')
        except Exception as e:
            flash('An error occurred while sending your message. Please try again later.', 'error')
        
        return redirect(url_for('main.contact'))
    
    return render_template('contact.html')

@main_bp.route('/search')
def search():
    query = request.args.get('q')
    if query:
        blog_results = BlogPost.query.filter(or_(
            BlogPost.title.ilike(f'%{query}%'),
            BlogPost.content.ilike(f'%{query}%')
        )).all()
        project_results = Project.query.filter(or_(
            Project.title.ilike(f'%{query}%'),
            Project.description.ilike(f'%{query}%')
        )).all()
    else:
        blog_results = []
        project_results = []
    
    return render_template('search_results.html', query=query, blog_results=blog_results, project_results=project_results)
