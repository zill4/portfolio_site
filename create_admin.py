from main import app, db
from models import User
from werkzeug.security import generate_password_hash
import traceback

def create_admin_user(username, email, password):
    with app.app_context():
        try:
            user = User.query.filter_by(username=username).first()
            if user is None:
                user = User(username=username, email=email)
                user.password_hash = generate_password_hash(password, method='sha256')
                db.session.add(user)
                db.session.commit()
                print("\n" + "="*50)
                print("SUCCESS: Admin user created")
                print(f"Username: {username}")
                print(f"Password: {password}")
                print("="*50 + "\n")
            else:
                print("\n" + "="*50)
                print(f"NOTICE: User '{username}' already exists.")
                print("="*50 + "\n")
        except Exception as e:
            print("\n" + "="*50)
            print("ERROR: Failed to create admin user")
            print(f"Error message: {str(e)}")
            print("Traceback:")
            print(traceback.format_exc())
            print("="*50 + "\n")

if __name__ == "__main__":
    create_admin_user("admin", "admin@example.com", "secureAdminPass123!")
