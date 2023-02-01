from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, BlogPost, setup_db
from sqlalchemy.sql import func
import logging

# email libaries
import smtplib
from email.mime.text import MIMEText

ITEMS_PER_PAGE = 10

def paginate_items(request, items):
    page = request.args.get('page', 1, type=int)
    start = (page - 1) * ITEMS_PER_PAGE
    end = page * ITEMS_PER_PAGE

    formatted_items = [item.format() for item in items]

    return formatted_items[start:end]

def create_app():
    app = Flask(__name__)
    setup_db(app)

    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    migrate = Migrate(app, db)

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    @app.route('/contact', methods=['POST'])
    def contact():
        try:
            sender = 'server.katywroteablog@gmail.com'
            password = 'qrljqewbvbwmdmkw'
            recipients = ['ryan.wilson0198@gmail.com']

            body = request.get_json()
            first_name = body.get('firstName', '[NOT PROVIDED]')
            surname = body.get('surname', '[NOT PROVIDED]')
            email = body.get('email', '[NOT PROVIDED]')
            phone_number = body.get('phoneNumber', '[NOT PROVIDED]')
            subject = body.get('subject', '[NOT PROVIDED]')
            message = body.get('message', '[NOT PROVIDED]')

            if phone_number == '':
                phone_number = '[NOT PROVIDED]'

            email_message = 'You have been contacted via katywroteablog.com:\n\n'

            email_message += 'First Name: ' + first_name + '\n'
            email_message += 'Surname: ' + surname + '\n'
            email_message += 'Email Address: ' + email + '\n'
            email_message += 'Phone Number: ' + phone_number + '\n\n'

            email_message += 'Message:\n\n' + message

            msg = MIMEText(email_message)
            msg['Subject'] = '[CONTACT FORM SUBMISSION] : ' + subject
            msg['From'] = sender
            msg['To'] = ', '.join(recipients)
            smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            smtp_server.login(sender, password)
            smtp_server.sendmail(sender, recipients, msg.as_string())
            smtp_server.quit()

            return jsonify({
                'success': True
            })
        except:
            logging.exception("message")
            abort(422)

    @app.route('/blogs', methods=['GET'])
    def get_blogs():
        try:
            id = request.args.get('id', None, type=int)
            if id is not None:
                blog_post = BlogPost.query.get(id)

                if not blog_post:
                    return jsonify({
                        'success': False,
                        'error': 404,
                        'message': 'blog post not found'
                    }), 404

                return jsonify({
                    'success': True,
                    'blogPost': blog_post.format()
                }), 200

            blog_type_id = request.args.get('blogTypeId', None, type=int)
            if blog_type_id is not None:
                blog_posts = BlogPost.query.filter(BlogPost.type==blog_type_id)
                return jsonify({
                    'success': True,
                    'blogPosts': [blog_post.format() for blog_post in blog_posts]
                }), 200
            
            blog_posts = BlogPost.query.order_by(BlogPost.id).all()
            selected_blog_posts = paginate_items(request, blog_posts)

            if not selected_blog_posts or len(selected_blog_posts) < 1:
                return jsonify({
                    'success': False,
                    'error': 404,
                    'message': 'resource not found'
                }), 404

            return jsonify({
                'success': True,
                'blogPosts': selected_blog_posts
            }), 200

        except:
            logging.exception("message")
            abort(422)

    @app.route('/blogs', methods=['POST'])
    def new_blog():
        body = request.get_json()
        title = body.get('title', None)
        type = body.get('type', None)
        image = body.get('image', None)
        content = body.get('content', None)
        is_draft = body.get('isDraft', False)

        if not title:
            return jsonify({
                'success': False,
                'error': 422,
                'message': 'Missing title'
            }), 422
        if not type:
            return jsonify({
                'success': False,
                'error': 422,
                'message': 'Missing type'
            }), 422
        if not content:
            return jsonify({
                'success': False,
                'error': 422,
                'message': 'missing content'
            }), 422

        try:
            blog_post = BlogPost(title=title, type=type, image=image, content=content, is_draft=is_draft)
            blog_post.insert()

            return jsonify({
                'success': True,
                'id': blog_post.id
            }), 201

        except Exception as e:
            logging.exception("message")
            return jsonify({
                'success': False,
                'error': 422,
                'message': str(e)
            })

    @app.route('/blogs/<int:blog_id>', methods=['PATCH'])
    def update_blog(blog_id):
        blog_post = BlogPost.query.get(blog_id)

        if not blog_post:
            abort(404)

        body = request.get_json()
        title = body.get('title', None)
        type = body.get('type', None)
        image = body.get('image', None)
        content = body.get('content', None)
        is_draft = body.get('isDraft', None)
        

        try:
            if title is not None:
                blog_post.title = title
            if type is not None:
                blog_post.type = type
            if image is not None:
                blog_post.image = image
            if content is not None:
                blog_post.content = content
            if is_draft is not None:
                if blog_post.is_draft == True and is_draft == False:
                    blog_post.is_draft = False
                    blog_post.created_date = func.now()
                elif blog_post.is_draft == False and is_draft == True:
                    blog_post.is_draft = True
                    blog_post.created_date = None

            blog_post.update()

            return jsonify({
                'success': True,
                'blog': blog_post.format()
            }), 201

        except:
            logging.exception("message")
            abort(422)

    @app.route('/blogs/<int:blog_id>', methods=['DELETE'])
    def delete_blog(blog_id):
        blog_post = BlogPost.query.get(blog_id)

        if blog_post is None:
            abort(404)

        try:
            blog_post.delete()

            return jsonify({
                'success': True,
                'id': blog_id
            }), 200

        except:
            abort(422)

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'success': False,
            'error': 404,
            'message': 'resource not found'
        }), 404

    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            'success': False,
            'error': 422,
            'message': 'unprocessable'
        }), 422

    return app

App = create_app()

if __name__ == '__main__':
    App.run(host='0.0.0.0', port=8080, debug=True)