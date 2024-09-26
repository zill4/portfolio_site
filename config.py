import os

class Config:
    SECRET_KEY = os.urandom(32)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://localhost:5432/minimalistdevportfolio'  + '?sslmode=require' 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
