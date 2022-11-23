import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import sys
import datetime

database_path = os.getenv('DATABASE_URL')

db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    print ("database_path : " + str(database_path))
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
    content = db.Column(db.String(50000))
    is_draft = db.Column(db.Boolean)
    created_date = db.Column(db.DateTime)

    def __init__(self, title, type, image, content, is_draft=False):
        self.title = title
        self.type = type
        self.image = image
        self.content = content
        self.is_draft = is_draft
        if is_draft == False:
            self.created_date = func.now()

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
            'content': self.content,
            'isDraft': self.is_draft,
            'createdDate': self.created_date
        }