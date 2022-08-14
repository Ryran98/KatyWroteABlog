import os
from flask_sqlalchemy import SQLAlchemy
import sys

database_path = os.getenv('DATABASE_URL')

db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)

class BlogPost(db.Model):
    __tablename__ = 'BlogPost'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    type = db.Column(db.Integer)
    image = db.Column(db.String(5000))
    content = db.Column(db.String(5000))

    def __init__(self, title, type, image, content):
        self.title = title
        self.type = type
        self.image = image
        self.content = content

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'title': self.title,
            'type': self.type,
            'image': self.image,
            'content': self.content
        }