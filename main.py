from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_mail import Mail
from config import Config
from models import db, User, BlogPost, Project
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

from routes import main_bp, blog_bp, projects_bp, admin_bp

app.register_blueprint(main_bp)
app.register_blueprint(blog_bp, url_prefix='/blog')
app.register_blueprint(projects_bp, url_prefix='/projects')
app.register_blueprint(admin_bp, url_prefix='/admin')

def create_tables():
    try:
        with app.app_context():
            inspector = db.inspect(db.engine)
            if not inspector.has_table("blog_post"):
                db.create_all()
                logger.info("Database tables created successfully")
            else:
                # Check if author_id column exists in blog_post table
                columns = inspector.get_columns("blog_post")
                if "author_id" not in [col['name'] for col in columns]:
                    # Add author_id column if it doesn't exist
                    with db.engine.connect() as conn:
                        conn.execute(db.text("ALTER TABLE blog_post ADD COLUMN author_id INTEGER"))
                    logger.info("Added author_id column to blog_post table")
    except Exception as e:
        logger.error(f"Error managing database tables: {str(e)}")

if __name__ == "__main__":
    create_tables()
    logger.info("Starting the Flask app...")
    app.run(host="0.0.0.0", port=5000)
