from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_mail import Message
from models import BlogPost
from main import app, mail

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
