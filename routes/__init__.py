from flask import Blueprint

main_bp = Blueprint('main', __name__)
blog_bp = Blueprint('blog', __name__)
projects_bp = Blueprint('projects', __name__)
admin_bp = Blueprint('admin', __name__)

from . import main, blog, projects, admin
