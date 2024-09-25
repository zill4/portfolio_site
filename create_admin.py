from main import app, db
from models import User
from werkzeug.security import generate_password_hash

def create_admin_user(username, email, password):
    with app.app_context():
        user = User.query.filter_by(username=username).first()
        if user is None:
            user = User(username=username, email=email)
            user.password_hash = generate_password_hash(password, method='sha256')
            db.session.add(user)
            db.session.commit()
            print(f"Admin user '{username}' created successfully.")
            print(f"Username: {username}")
            print(f"Password: {password}")
        else:
            print(f"User '{username}' already exists.")

if __name__ == "__main__":
    create_admin_user("admin", "admin@example.com", "secureAdminPass123!")
