from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_mail import Mail
from config import Config
from models import db, User
import logging

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'admin.login'

mail = Mail(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def create_tables():
    try:
        with app.app_context():
            db.create_all()
            logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {str(e)}")

# Import blueprints
from routes import main_bp, blog_bp, projects_bp, admin_bp

# Register blueprints
app.register_blueprint(main_bp)
app.register_blueprint(blog_bp, url_prefix='/blog')
app.register_blueprint(projects_bp, url_prefix='/projects')
app.register_blueprint(admin_bp, url_prefix='/admin')

if __name__ == "__main__":
    create_tables()
    logger.info("Starting the Flask app...")
    app.run(host="0.0.0.0", port=5000, debug=True)
