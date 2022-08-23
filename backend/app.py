from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, BlogPost, setup_db
import logging

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

    @app.route('/blogs', methods=['GET'])
    def get_blogs():
        try:
            blog_post_id = request.args.get('blogPostId', None, type=int)
            if blog_post_id is not None:
                blog_post = BlogPost.query.get(blog_post_id)

                return jsonify({
                    'success': True,
                    'blogPost': blog_post.format()
                }), 200

            blog_type_id = request.args.get('blogTypeId', None, type=int)
            if blog_type_id is not None:
                blog_posts = BlogPost.query.filter(BlogPost.type==blog_type_id)
                return jsonify({
                    'success': True,
                    'blogs': [blog_post.format() for blog_post in blog_posts]
                }), 200
            
            blog_posts = BlogPost.query.order_by(BlogPost.id).all()
            selected_blog_posts = paginate_items(request, blog_posts)

            if not selected_blog_posts or len(selected_blog_posts) < 1:
                abort(404)

            return jsonify({
                'success': True,
                'blogs': selected_blog_posts
            }), 200

        except Exception as e:
            logging.critical(e, exc_info=True)
            abort(422)

    @app.route('/blogs', methods=['POST'])
    def new_blog():
        body = request.get_json()
        title = body.get('title', None)
        type = body.get('type', None)
        image = body.get('image', None)
        content = body.get('content', None)

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
            blog_post = BlogPost(title=title, type=type, image=image, content=content)
            blog_post.insert()

            return jsonify({
                'success': True,
                'id': blog_post.id
            }), 201

        except:
            abort(422)

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

        try:
            if title is not None:
                blog_post.title = title
            if type is not None:
                blog_post.type = type
            if image is not None:
                blog_post.image = image
            if content is not None:
                blog_post.content = content

            blog_post.update()

            return jsonify({
                'success': True,
                'blog': blog_post.format()
            }), 201

        except:
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